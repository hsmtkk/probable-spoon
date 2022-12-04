gcloud dataflow flex-template build gs://storage-probable-spoon-370621/template/wordcount-go.json ^
 --image "asia-northeast1-docker.pkg.dev/probable-spoon-370621/registry/wordcount:latest" ^
 --sdk-language "GO" ^
 --metadata-file "metadata.json"
