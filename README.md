# fronters.cc
A website that interfaces with PluralKit and/or Simply Plural to display a user's public fronters. fronters.cc is a Flask application that uses [PostgreSQL 16.2](https://www.postgresql.org/) as a database software. 

# Requirements
Python dependencies include [Flask 3.0.3](https://flask.palletsprojects.com/en/3.0.x/), [Flask_RESTful 0.3.10](https://flask-restful.readthedocs.io/en/latest/), [Psycopg 2.9.9](https://www.psycopg.org/docs/), and [Requests 2.31.0](https://requests.readthedocs.io/en/latest/). JavaScript dependencies include [md-block](https://md-block.verou.me/) and [DOMPurify 3.0.11](https://github.com/cure53/DOMPurify/releases/tag/3.0.11). If you want to host your own public copy of fronters.cc, you will need to connect to a database software of your choice (preferrably PostgreSQL). You will also need:
- A file named `database.ini` with your database configurations.
- An API authentication method of your choice to keep your data safe. (You will have to configure the code to your authentication type.)

# So how does this work?
fronters.cc will collect the minimum amount of data required to create a fronting site. For PluralKit users, this means we will only ask for your system ID. For Simply Plural users, we will need your user ID and your token.
Because this is sensitve data, Simply Plural users must set a custom URL for their fronting page to protect their privacy. fronters.cc asks for <strong>READ-ONLY</strong> tokens to further protect your data.
fronters.cc will only show <strong>PUBLIC</strong> fronters. Private fronters (and fronters only shown to Trusted Friends) will not appear on the website. For more information on creating your own page, see the buttons at the bottom of the page.</p>

# Wait, I want to do something like this, too!
Hell yeah! That's awesome! I think everyone should be able to try their hand at making a website. Here's what you can do to start something like this yourself:
- **Get ready to be confused and frustrated.** I'm so serious. I started this project thinking it would take me 2 weeks from development to production. It took 3 months just to release a very slow beta version full of bugs. Every time I worked on it, I told myself, "I hate coding! This is so miserable!" I gave up at least three times. It's (unfortunately) a really common experience while coding! When you're about ready to throw your computer out of a window, know that you're not alone. I promise, you're not "stupid" because your code isn't working. You're just learning, and that's ok!
- **Find a coding community.** [Stack Overflow](https://stackoverflow.com/questions) and coding-related Discord servers are my saviors. Whenever I got especially stumped, I reached out to people who knew the struggle and used their support to keep going. fronters.cc wouldn't exist if it weren't for the help of kind internet strangers.
- **Start by learning HTML and CSS!** If you want to learn how to make a cool website, you've got to start with HTML and CSS. Any educational resources are fine, but I'm a big fan of [W3Schools](https://www.w3schools.com/) and [GeeksforGeeks](https://www.geeksforgeeks.org/). Whenever I want to learn something new, those are the first places I go. Once you feel comfortable with HTML and CSS, you can move on to downloading Node.js (a JavaScript runtime) and Python and explore those languages, too.
- **After a couple weeks of learning, use a framework!** Now this one, admittedly, I still don't know much about. But I've recently discovered frameworks, which legitimately exist for the sole purpose of making your life as a coder easier. (fronters.cc utilizes Flask, which is a microframework!) For a beginner, I would recommend starting with [Bootstrap](https://getbootstrap.com/). It helps you make your websites look pretty with half the effort. But it's important that you try to code things yourself first *before* you start using frameworks.

Before you start a project like fronters.cc, you'll want to be:
- **Advanced** at HTML, CSS, and Javascript;
- **Intermediate** at Python, SQL, and a database software of your choice; and
- **Beginner** at Bash / command line scripting, Git, and using relative filepaths.

For testing and development, you should teach yourself how to use either Node.js or a live server on your localhost. For production, you should familiarize yourself with authentication types (OAuth2, token, password, cookies, etc.), domain registrars and DNS records, SSL certificates for HTTPS, and the difference between IaaS, PaaS, Saas, etc to determine how to host your project.

# License
This project is under the GNU Affero General Public License, Version 3. It is available at the following link: https://www.gnu.org/licenses/agpl-3.0.en.html

![Screenshot of the landing page](static/images/fronterscc-screenshot.png)
