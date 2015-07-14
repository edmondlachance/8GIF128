start php -S localhost:80
start websocketd --port=8080 java -jar Graph.jar
start websocketd --port=8081 java -jar ShortestPath.jar
start websocketd --port=8082 java -jar MinimumSpanningTree.jar
start firefox localhost