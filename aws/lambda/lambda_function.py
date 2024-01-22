import pymongo
from pymongo import MongoClient
import os


def lambda_handler(event, context):
    # Connect to MongoDB
    client = MongoClient(os.environ.get("MongodbURI"))
    db = client['eventManagement']
    collection = db['sessioncurrents']
    current_attendee_collection = db['currentattendees']

    # Get data from AWS IoT Core
    data = {
        'roomid': event['roomid'],
        'timestamp': event['timestamp'],
        'rfid_id': event['rfid_id']
    }

    # Insert data into MongoDB
    collection.insert_one(data)

    # Check if the rfid_id count is odd or even in the 'reader-data' collection
    rfid_count = collection.count_documents({'rfid_id': event['rfid_id']})

    # Update 'currentAttendee' collection based on odd or even count
    if rfid_count % 2 == 1:
        current_attendee_collection.update_one(
            {'conferenceId': event['roomid']},
            {'$addToSet': {'rfidNo': event['rfid_id']}},
            upsert=True
        )
    else:
        current_attendee_collection.update_one(
            {'conferenceId': event['roomid']},
            {'$pull': {'rfidNo': event['rfid_id']}},
            upsert=True
        )

    # Update 'currentCapacity' based on the count of rfidNo in 'currentAttendee' collection
    current_capacity = len(current_attendee_collection.find_one(
        {'conferenceId': event['roomid']}, {'rfidNo': 1}).get('rfidNo', []))
    current_attendee_collection.update_one(
        {'conferenceId': event['roomid']},
        {'$set': {'currentCapacity': current_capacity}},
        upsert=True
    )

    # Return response
    return {
        'statusCode': 200
    }
