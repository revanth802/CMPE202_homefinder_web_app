## CMPE 202: HomeFinder Web Application

### Team members

Revanth Krishna Maddula         
Sandeep Reddy Bhimireddy      
Laxmi Prasanna Palle              
Thanmai Gajam			   

### Overall Architecture

![202_arch](https://github.com/gopinathsjsu/fa20-cmpe-202-sec-02-team-project-team_13/blob/master/images/Architecture.jpg?raw=true)

### Component Level Architecture Diagram

![202_arch](https://github.com/gopinathsjsu/fa20-cmpe-202-sec-02-team-project-team_13/blob/master/images/Architecture%20Diagram%20-%20Components.PNG?raw=true)


### Technology stack:
- UI - ReactJS,CSS,Bootstrap, Material-UI
- Backend - NodeJS
- Database - MongoDB

### Database Design(Tables):
- Users
- home_Listings
- scheduled_visits
- favourite_searches
- favourite_homes
- lease_pplications

### Entity-Relationship Diagram:
![202_arch](https://github.com/gopinathsjsu/fa20-cmpe-202-sec-02-team-project-team_13/blob/master/images/Er_diagram.jpg?raw=true)

### Wireframes: 

https://github.com/gopinathsjsu/fa20-cmpe-202-sec-02-team-project-team_13/tree/master/wireframes

### Summary of Contributions:
- Revanth - Worked on Authentication, Listings , Search bar, Add a new Listing, Admin dashboard Components.
- Prasanna - Worked on Favourite Searches, Favourite Homes, Homelisting  and role functionality behaviour.
- Thanmai - Worked on Lease and Sale Applications, covering the roles of realtor and user.
- Sandeep - Worked on Schedule Tours/visits components,S3 storage for homelisting images, handling of Email API and cloud deployment.


### Design Decisions: 

- *Tech Stack:* To implement the home finder, our team met in the first scrum and discussed on what the tech stack has to be and finalized on MERN stack and AWS

- *Role level Access:* Our team had different interpretations on how the roles should be developed and how they should be on the website, After having intense discussions, we finalized on just 3 roles : An User(Who can buy, sell, rent out, get a house for rent), A realtor (Who can do all the operations but on behalf of some user), And an Admin(Who can approve and reject users

- *Code Reusability:* As most of the Components look similar, we thought of writing core components in such a way that we can reuse them in all places with little effort. We have developed more robust and common API’s for our backend(like Email API, a single API to handle buy and rent etc., ) and  common components for frontend(Similar UI components for Rent, Buy)

- *File handling:* We had to decide whether to store files on the machine or cloud. After putting a thought to it, figured out having the files stored on cloud and just storing imagePath in the database is the best possible design to have. 

- *Deployment:* There were different ways to deploy the application into the cloud. We decided to use AMI(Amazon Machine Instance) with a configuration at the startup. We used this AMI as a target group for an Auto scaling cluster group that is based on the classic load balancer. 



### Feature Set:

*User:*

1. Browse and filter houses for rent and sale
2. Schedule a tour and book an appointment for the tour (This sends an Email to house representer and user saying appointment is fixed)
3. Fill the Lease application form and apply for rent(This action sends an Email to the house representer saying you have an appliaction)
4. Can save houses and search criteria as favorites
5. Can list a property for buy or sell
6. See applications for the listed properties
7. Can review and update the status for the above applications
8. Can update an already existing listing

*Realtor:*
He can do all the functionalities as an user, but they will be on behalf on some user. 

*Admin:*
1. He can approve, reject and remove users based on the need. 
2. Can search for properties. 


### Team Project board:
https://github.com/gopinathsjsu/fa20-cmpe-202-sec-02-team-project-team_13/projects/1


### Team Project Journal:
[GO TO PROJECT JOURNAL ](Project_Journal.md)


### Team Project Google Sprint Task Sheet:
Sprint Task sheet and burndown charts included:
https://docs.google.com/spreadsheets/d/1mbZJFJDb_U9asAb0lnBsGHogBCdr6Qy0GHGnliVzB7E/edit?usp=sharing
