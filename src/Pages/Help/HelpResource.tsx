const Resource = {
  general: `
# TeamRadio:
---
A playlist for teams that can be edited collaboratively by all users
`,
  score: `
# User score rules:
---
## Global score - (reputation): 
+ How to get point of reputation? You can get point from: 
    - Updating your profile: The first time you update your profile, you can get points.
      * Avatar: twenty points.
      * Cover photo: twenty points.
      * Other: two points/field and 10 points in total (city, country, bio, first name, and last name).

    -	Creating your station: For each your station, you can get points. 
      * User: Each two users who joined your station at the first time, you get one point.
      * Song: Each song which is added to your station by other users, you get one point.
      * Your songs are liked: For each up vote/like your songs receive from other users, you get one point.
      * Your songs are disliked: there will be no minus points in the reputation of users.


+ What can you do with your point? 
    * Increase number of your private stations: After you create your new private account, you have one station in limit. Each thirty points you have you can get one more private station in limit. More points you have more stations you can create.
      * Example: *After you update full your profile, you can get 50 points and then you have 1 station in limit*.

    - Increase your point in station: When the first times you join each station (not yours) you get a station score. By default as a new user, you have zero. Each 10% your reputation you get 1 station score.
    
      * Example: *After you update full your profile, you can get 30 points and you have 3 station scores*
---     
## Station score:
+ How to get point of station score? You can get point from: 
  -	Like on your songs :  Each like on your song which you added, you get 1 point . Remember you cannot like your song. When you like a song (not yours) you spend 1 point. When your point equal zero, you cannot like song. You can like more than 1 times. It help the song you like was played more soon.
  -	Adding your song: For each song you add you get 1 point, each your song was skipped you lose 1 point. When your point is -1. You need to wait a minute to continue add new song and then your point reset to zero.
  
+ What can you do with your point? 
  -	You can like for the song you like to  make it be play soon, because the song in top of like  is played first.
`,
};

export default Resource;
