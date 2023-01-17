# DevOps Project

## 1. Application
It's a Frontend/Backend application with basic CRUD features, developed using the MERN stack. You can access the application [Here](http://20.74.93.255/) 
![image](https://user-images.githubusercontent.com/59792971/212894851-2d57c692-a16f-4d00-abd2-61ba9b3dab96.png)

## 2. Observability
### 1. Logging
I used winston on nodejs to enable logging
those are the logs generated by app
![image](https://user-images.githubusercontent.com/59792971/212901996-b30a14ee-151d-438c-93c4-8db0392e82de.png)
We can see tha we have a request id
![image](https://user-images.githubusercontent.com/59792971/212901093-6e9f3717-3b51-4c5c-a7bb-dc904138ddb8.png)

### 2. Metrics
I used prom-client to congigure metrics in my application.
This is the first metric of tghe total requests
![image](https://user-images.githubusercontent.com/59792971/212903497-fde99b44-42f0-483a-80b6-ff6d0d832da3.png)
My business metric is the total_tasks in my kanban dashboard
![image](https://user-images.githubusercontent.com/59792971/212904188-6e799626-ce21-4a95-9cc6-42b9ca1ff336.png)
I visualized these metrics in grafana dashboard
![image](https://user-images.githubusercontent.com/59792971/212925037-bb794e00-0bde-403b-b23e-c7d7ad897e19.png)

## 3. Deployment
I built the frontend and the backend using docker and then I deployed them using kubernetes. This is the architecture of the deployment of the application

![architecture](https://user-images.githubusercontent.com/59792971/212928528-f8d6db6c-720c-46c0-99b0-ad5886964081.png)
 
 ## 4. Automation
 ### 1. Kubernetes Cluster provisioning
 Here I provisioned an AKS cluster whithin an existiong resource group
 
 ### 2. Application deployment automation
 
 ### 3. Monitoring automation
