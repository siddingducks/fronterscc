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
That's awesome! I think everyone should be able to try their hand at making a website. Before you start a project like fronters.cc, you'll want to be:
- **Advanced** at HTML, CSS, and Javascript;
- **Intermediate** at Python, SQL, and a database software of your choice; and
- **Beginner** at Bash / command line scripting, Git, and using relative filepaths.

For testing and development, you should teach yourself how to use either Node.js or a live server on your localhost. For production, you should familiarize yourself with authentication types (OAuth2, token, password, cookies, etc.), domain registrars and DNS records, SSL certificates for HTTPS, and the difference between IaaS, PaaS, Saas, etc to determine how to host your project.

# License
This project is under the GNU Affero General Public License, Version 3. It is available at the following link: https://www.gnu.org/licenses/agpl-3.0.en.html

![Screenshot of the landing page](static/images/fronterscc-screenshot.png)
