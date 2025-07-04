import requests
import json
def read_audio(WAVE_FILENAME):
    # function to read audio(wav) file
    with open(WAVE_FILENAME, 'rb') as f:
        audio = f.read()
    return audio
def wit():
	API_ENDPOINT = 'https://api.wit.ai/speech'
	ACCESS_TOKEN = '45N5OTMTN3LKPDKOOYAYYABZKMARSYXP'

	# get a sample of the audio that we recorded before. 
	audio = read_audio("corrections/path-corrected.wav")

	# defining headers for HTTP request
	headers = {'authorization': 'Bearer ' + ACCESS_TOKEN,
		   'Content-Type': 'audio/wav'}

	#Send the request as post request and the audio as data
	resp = requests.post(API_ENDPOINT, headers = headers,
		                 data = audio)

	#Get the text
	import chardet
	data= json.loads(resp.content.decode('utf-8'))
	with open('text.json', 'w') as outfile:
	    json.dump(data, outfile)
	return data
