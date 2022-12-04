gcloud dataflow flex-template run "wordcount-go-01" ^
 --template-file-gcs-location gs://storage-probable-spoon-370621/template/wordcount-go.json ^
 --parameters input=gs://apache-beam-samples/shakespeare/kinglear.txt ^
 --parameters output=gs://storage-probable-spoon-370621/output/result.txt ^
 --region asia-northeast1
