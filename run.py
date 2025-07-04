#!/usr/bin/env python
import ASSR
import sys
import wave
import trim
import merge
import out
import wit
import time
def run():
	merge.merge()
	out.out()
	ac = ASSR.AudioCorrection('path.wav' , 'tfSessions/2018-10-13-01:40:12-0.8486092/session.ckpt')
	ac.process()
	ac.saveCorrectedAudio()
	time.sleep(1)
	wit.wit()
	return 1

