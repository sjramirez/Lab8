# Lab8_Starter

## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter)
   1. I would fit automated tests into my repository to check that basic functionality of core functions are nor impacted by the changes that are pushed to the repository
   2. Automated tests should be written at the same time or even before the code so it is feasible that they can be run on the new code before enven pushing the code
   3. Automated tests like load testing should still be running even after development for the team to know the limits of the software that they created.

2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.
   1. I would use a unit test for this feature, or I would use some unit tests in the sense that I could test each function of that so I could test that the message has been recorded and that then is has been staged to send, and then test the function that actually sends it.
   

3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters
   1.  I woulad also use a unit test for this feature since, I could pass in valid message lengths and then onesa that are two long and I know if it is supposed to fail or not.

4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?
   1. I would expect for puppeteer to run with settings that are universal to the major browsers but not with any browser unique features. I also do not think it would be able to test functionallity as well.

5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?
   1. beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);
    avait page.click('header img');
  });
