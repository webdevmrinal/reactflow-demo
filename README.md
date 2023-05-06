#React Node Graph Creator
This project is aimed to create a graph of nodes with React.

##Installation
Clone this repository using git clone https://github.com/webdevmrinal/reactflow-demo.git
Install the dependencies using npm install

##Usage
Run the project using npm start
Open the web app on http://localhost:3000

##Demo
https://reactflow-demo.netlify.app/

##Tasks
Create a React project and create a page with name ‘Home’.
Create a button on left side ‘Create node’ and upon clicking on it, a node in circle/rectangle shape should get created on graph panel.
Implement connecting two nodes with a branch.
On mouse over to a node show ‘X’ icon in red color , upon clicking that icon delete that node. Similarly do the same for branches.
Record a video of working of creating nodes, adding branches, deleting nodes and deleting branches.
##Code
The CustomNode component renders the custom nodes with label data.
The CustomEdge component renders the custom edges.
The App component renders the main React app.
nodeTypes and edgeTypes objects define the custom node and edge types.
The handleCreateNode function adds a new node to the graph.
The onConnect function connects two nodes with an edge.
The onNodesChange and onEdgesChange functions update the state of nodes and edges respectively.
The removeNode function removes a node from the graph.
##Contact
If you have any questions or feedback, please contact Mrinal Madhukar (mrinal.webdev@gmail.com).
