import difflib
import os
import untangle
import sys
import numpy
import csv
reload(sys) # just to be sure
sys.setdefaultencoding('utf-8')

def get_edit_distance(before, after):
    matcher = difflib.SequenceMatcher(isjunk=None, a=before, b=after)
    return 1. - matcher.ratio()


# xliffDir = '/home/adapt/Documents/python/kanjingo/xliff/'
logDir = '/home/adapt/Documents/python/kanjingo/lastLogs/logs'

logFiles = [os.path.join(logDir, f) for f in os.listdir(logDir)
            if os.path.isfile(os.path.join(logDir, f))]

print len(logFiles)

logs = [untangle.parse(f) for f in logFiles]

print logs[0].root.job

users = [
    "PA01@test.ie",  
    "PA02@test.ie",  
    "PA03@test.ie",  
    "PA03b@test.ie", 
]

totalValues = []
totalValues.append(['User', 'User ID', 'Document ID', 'Segment ID', 'Source', 'Machine Translation', 'Post Edit', 'Edit Distance', 'Total Edit Time', 'Total Voice Chars', 'Total Tile Chars', 'Total Editor Chars', 'Tile Operations'])
# chars produced in voice view, chars produced in tile view, 
# number of tile operations, edit distance,
for log in logs:
    for job in log.root.job:
        # get all user names first
        print job['user']
        # print job['userId']
        # print job['document']
        if (job['user'] in users):
            originalMachineTranslation = [None] * 50
            for unit in job.unit:
                valueArray = [job.get_attribute('user'), job['userId'], job['document']]
                # then print all segment numbers
                # print unit['id']
                valueArray.append(unit['id'])
                print(log)

                if (originalMachineTranslation[int(unit['id'])] == None):
                    originalMachineTranslation[int(unit['id'])] = unit.target.cdata
                valueArray.append(unit.source.cdata)
                valueArray.append(originalMachineTranslation[int(unit['id'])])
                valueArray.append(unit.translation.cdata)
                valueArray.append(get_edit_distance(originalMachineTranslation[int(unit['id'])], unit.translation.cdata))
                # print unit.source.cdata
                # print unit.target.cdata
                # print unit.translation.cdata
                for indicator in unit.annotations.annotation.indicator:
                    # print indicator
                    if indicator['type'] == 'time':
                        # total editing time for segment
                        # print indicator.cdata
                        valueArray.append(indicator.cdata)
                totalVoiceChars = 0
                totalTileChars = 0
                totalEditorChars = 0
                tileOps = 0
                for event in unit.annotations.annotation.events.children:
                    #print 'Event ', event
                    if event._name == 'flow':
                        print event._name
                    if event._name == 'TileEdit':
                        chars = len(event.cdata)
                        totalTileChars += chars
                    if event._name == 'keystroke':
                        totalEditorChars += 1
                    if event._name == 'drag':
                        tileOps += 1
                    if event._name == 'voiceInput':
                        chars = len(event.cdata)
                        totalVoiceChars += chars
                valueArray.append(totalVoiceChars)
                valueArray.append(totalTileChars)
                valueArray.append(totalEditorChars)
                valueArray.append(tileOps)
                # print valueArray
                my_list = [str(valueArray[x]).rstrip('\t\r\n').replace('\n', ' ').replace('\r', '').replace('\t', '') for x in range(len(valueArray))]
                #print my_list
                totalValues.append(my_list)

#print totalValues

with open("lastLogs.csv", "wb") as f:
    writer = csv.writer(f)
    writer.writerows(totalValues)