from pyAudioAnalysis import audioTrainTest as aT
pyAudioAnalysis.pyAudioAnalysis()
aT.featureAndTrain(["classifierData/music","classifierData/speech"], 1.0, 1.0, aT.shortTermWindow, aT.shortTermStep, "svm", "svmSMtemp", False)
aT.fileClassification("C:\\Users\\WestHamster\\Downloads\\Compressed\\Team\\F_0050_10y9m_1.wav", "svmSMtemp","svm")
