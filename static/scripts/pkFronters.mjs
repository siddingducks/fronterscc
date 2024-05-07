const div = document.getElementById('root');
div.innerHTML = '';
let customError = document.createElement('span');
customError.classList.add('error-mssg');
var frontersData;

//establish variables for authorization and page loading
async function getSysID() { 
    let result = await fetch('/api' + window.location.pathname, {
        method: "GET", 
        headers: {
            'Accept': 'application/json'
        }
    });
    let sysID = await result.json();
    return sysID;
};

(async function renderPage() {
    let sysID = await getSysID();

    let config = {
        apiBase: 'https://api.pluralkit.me/v2',
        system: sysID || 'urzip',
        method: 'GET',
        headers: { 
            'User-Agent': 'FrontPluralCodes2.0 (https://github.com/siddingducks)',
            Accept: 'application/json'
        },
        maxBodyLength: Infinity
    }

    //get fronters from the pk api
    async function fetchFronters() {
        const url = config.apiBase + '/systems/' + config.system + '/fronters';
        try {
            const result = await fetch(url, config.headers);
            const data = await result.json();
            return data;
        } catch(error) {
            customError.innerText = 'Error: Looks like the PK API might be down. Please check back later!';
            div.appendChild(customError);
        }
    }

    //establish data variables for rendering member cards
    var data = await fetchFronters();
    frontersData = data.members;

    //send data to renderCards() UNLESS the system's fronters are private/out
    if (frontersData!='') {
        for (const member of frontersData) {
            renderCards(member, div);
        }
    }
    else {
        customError.innerText = 'It looks like this system has no public fronters right now.';
        div.appendChild(customError);
    }

    function renderCards(member, div) {
        div.classList.add('member-card-container');

        let memberElement = document.createElement("div");
        memberElement.classList.add('member-card');
        memberElement.setAttribute('member-color', '#' + (member.color || '000'));
        memberElement.setAttribute('member-pronouns', member.pronouns);
        memberElement.setAttribute('member-avatar', member.avatar_url);
        memberElement.setAttribute('member-birthday', member.birthday);
        memberElement.setAttribute('member-desc', member.description);
        memberElement.setAttribute('member-banner', member.banner);

        try { 
            let memberAvatar = document.createElement('div');
            if (member.avatar_url != null) {
                memberAvatar.classList.add('member-avatar');
                memberAvatar.style.borderColor = memberElement.getAttribute('member-color');
                memberAvatar.style.backgroundImage = 'url(' + memberElement.getAttribute('member-avatar') + ')';
                memberAvatar.style.backgroundRepeat = 'no-repeat';
                memberAvatar.style.backgroundPosition = 'center center';
                memberAvatar.style.backgroundSize = 'cover';
                memberElement.appendChild(memberAvatar);
            }

            let memberName = document.createElement('strong');
            memberName.classList.add('member-name');
            if (member.name!=null) {
                memberName.innerText = member.name + '\n';
                memberElement.appendChild(memberName);
            }

            let memberDisplayName = document.createElement('em');
            memberDisplayName.classList.add('member-displayname');
            if (member.display_name!=null) {
                memberDisplayName.innerText = member.display_name + '\n';
                memberElement.appendChild(memberDisplayName);
            }

            let memberPronouns = document.createElement('md-span');
            memberPronouns.classList.add('member-pronouns');
            memberPronouns.classList.add('md-span');
            if (member.pronouns!=null) {
                member.pronouns = toDiscordMarkdown(member.pronouns);
                memberPronouns.innerHTML = DOMPurify.sanitize(member.pronouns);
                memberElement.appendChild(memberPronouns);
            }

            let memberBirthday = document.createElement('em');
            memberBirthday.classList.add('member-birthday');
            if (member.birthday!=null) {
                let birthday = member.birthday;
                if (birthday.includes('0004-')) {
                    birthday = birthday.replace('0004-','');
                }
                memberBirthday.innerText = birthday + '\n';
                memberElement.appendChild(memberBirthday);
            }

            let memberDesc = document.createElement('md-block');
            memberDesc.classList.add('member-desc');
            if (member.description!=null) {
                member.description = toDiscordMarkdown(member.description);
                memberDesc.innerHTML = DOMPurify.sanitize(member.description);
                memberElement.appendChild(memberDesc);
            }

            let memberBanner = document.createElement('div');
            if (member.banner != null) {
                console.log('url(' + memberElement.getAttribute('member-banner') + ')');
                memberBanner.classList.add('member-banner');
                memberBanner.style.borderColor = 'transparent';
                memberBanner.style.backgroundImage = 'url(' + memberElement.getAttribute('member-banner') + ')';
                memberBanner.style.backgroundRepeat = 'no-repeat';
                memberBanner.style.backgroundPosition = 'center center';
                memberBanner.style.backgroundSize = 'cover';
                memberBanner.style.display = 'inline-block';
                memberBanner.innerHTML = '<img src="' + DOMPurify.sanitize(member.banner) + '" style="visibility:hidden;width:100%;" alt="banner" />'
                memberElement.appendChild(memberBanner);
            }

            div.appendChild(memberElement);
        }
        catch(err) {
            customError.innerText = 'Error: ' + err;
            div.appendChild(customError);
        };
    }

})();