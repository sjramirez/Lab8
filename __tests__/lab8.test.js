/**
 *  @jest-enviornment jsdom
 */
describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);
  });

  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  // test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
    await page.click('main journal-entry');
    let url = await page.url();
    let valid = url.includes('/#entry1');
    expect(valid).toBe(true);

  });

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 
    let title = await page.$eval('header h1', e => e.textContent);
    expect(title).toBe('Entry 1');
  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {

    
    // implement test5: Clicking on the first journal entry should contain the following contents: 
        let content = { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
        let entryPage = await page.$eval('body entry-page', e => e.entry);
        //let pageContent = await entryPage.getProperty('entry');
        expect(entryPage).toMatchObject(content);
      

  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’
    let className = await page.$eval('body', e => e.className);
    expect(className).toBe('single-entry');

  }, 5000);

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”
    await page.click('header img');
    let url = await page.url();
    let valid = url.includes('/#settings');
    expect(valid).toBeTruthy();
  });

  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”
    let header = await page.$eval('header h1', e => e.textContent);
    expect(header).toBe('Settings');

  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    let className = await page.$eval('body', e => e.className);
    expect(className).toBe('settings');
  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    await page.goBack();
    let url = page.url();
    let valid = url.includes('/#entry1');
    expect(valid).toBeTruthy();

  });

  it('test11: Clicking the back button once should bring the user back to the home page', async() =>{
    // define and implement test11: Clicking the back button once should bring the user back to the home page
    await page.goBack();
    let url = page.url();
    expect(url).toBe('http://127.0.0.1:5500/');

  });
  
  it('test12: When the user if on the homepage, the header title should be “Journal Entries', async() => {
     // define and implement test12: When the user if on the homepage, the header title should be “Journal Entries”
     let header = await page.$eval('header h1', e => e.textContent);
     expect(header).toBe('Journal Entries');
  });

  it('test13: On the home page the <body> element should not have any class attribute', async() => {
    // define and implement test13: On the home page the <body> element should not have any class attribute 
    let className = await page.$eval('body', e => e.className);
    expect(className).toBe("");
  }, 5000);

   it('test14: Verify the url is correct when clicking on the second entry', async () => {
      // define and implement test14: Verify the url is correct when clicking on the second entry
      let entry = await page.$$('journal-entry');
      let second = entry[1];
      await second.click(); 
      await page.waitForTimeout(500);
      let url = await page.url();
      console.log(url);
      let valid = url.includes('/#entry2');
      expect(valid).toBeTruthy();
   });
  

   it('test15: Verify the title is current when clicking on the second entry', async () => {
      // define and implement test15: Verify the title is current when clicking on the second entry
      let title = await page.$eval('header h1', e => e.textContent);
      expect(title).toBe('Entry 2');
   });


   it('test16: Verify the entry page contents is correct when clicking on the second entry', async () => {
     // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
    let entryPage = await page.$eval('body entry-page', e => e.entry);
    let content = {
        title: 'Run, Forrest! Run!',
        date: '4/26/2021',
        content: "Mama always said life was like a box of chocolates. You never know what you're gonna get.",
        image: {
          src: 'https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg',
          alt: 'forrest running'
        }
    }
    expect(entryPage).toMatchObject(content);
    
   });

   it('test 17: test hitting the header returns to the default view', async () => {
      await page.click('header img');
      await page.click('header h1');
      let title = await page.$eval('header h1', e => e.textContent);
      expect(title).toBe('Journal Entries');
   },10000);
  
   it('test 18: test back goes from default to settings', async () => {
      await page.goBack();
      let title = await page.$eval('header h1', e => e.textContent);
      expect(title).toBe('Settings');
   });

   it('test 19: test go forward', async () => {
    await page.goForward();
    let title = await page.$eval('header h1', e => e.textContent);
    expect(title).toBe('Journal Entries');
   });

   it('test 20: test that audio gets deleted when opening an entry that does not have audio', async () => {
    let entries = await page.$$('journal-entry');
    let fourth = entries[3];
    let third = entries[2];
    await fourth.click();
    await page.goBack();
    await third.click();
    let entry = await page.$eval('body entry-page', e => e.entry);
    let audio = entry.audio;
    expect(audio).toBeUndefined();
   }, 10000);
  // create your own test 17

  // create your own test 18

  // create your own test 19

  // create your own test 20
  
});
