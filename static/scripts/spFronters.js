const div = document.getElementById('root');
div.innerHTML = '';
let customError = document.createElement('span');
customError.classList.add('error-mssg');
var config;
var userData;

//establish variables for authorization and page loading
(async function () { 
  let result = await fetch("/api" + window.location.pathname, {
      method: "GET", 
      headers: {
          'Accept': 'application/json'
      }
  });

  userData = await result.json();
  config = {
    frontersApiBase: 'https://api.apparyllis.com/v1/fronters/',
    membersApiBase: 'https://api.apparyllis.com/v1/member/',
    customFrontApiBase: 'https://api.apparyllis.com/v1/customFront/',
    sysID: userData[0][0],
    headers: { 
      'Authorization': userData[1][0],
    },
    maxBodyLength: Infinity
  };

  renderPage();
})();

//get fronters from the pk api
async function fetchFronters() {
  try {
      const result = await fetch(config.frontersApiBase, {headers: config.headers});
      const data = await result.json();
      return data;
  } catch(error) {
      customError.innerText = "Error: Can't get your fronters. Did you enter the right token? (Alternatively, the SP API might be down. Please check back later!)";
      div.appendChild(customError);
  }
}

async function fetchMember(memberID, isCustom) {
  try {
    var result;
    if (isCustom) {
      result = await fetch(config.customFrontApiBase + config.sysID + '/' + memberID, {headers: config.headers});
    } else {
      result = await fetch(config.membersApiBase + config.sysID + '/' + memberID, {headers: config.headers});
    }
    var member = await result.json();

    if (isCustom) {
      member.content.pronouns = '*(Custom Front)*';
    }
    if (member.content.private == true) {
      member = undefined;
    }

    return member;
  } catch(error) {
      customError.innerText = "Error: Can't get your memebrs. Did you enter the correct system ID?";;
      div.appendChild(customError);
  }
}

  //establish member ID for rendering member cards
  async function renderPage() {
    var frontersData = await fetchFronters();
    var members = [];
    var isCustom;

    for (const fronter of frontersData) {
      let memberID = fronter.content.member;
      isCustom = fronter.content.custom;
      let member = await fetchMember(memberID, isCustom);
      member = member.content;
      if (fronter.content.customStatus) {
          member.customStatus = fronter.content.customStatus;
      }
      members.push(member);
    }

    for (const member of members) {
      if (member != undefined) {
        renderCards(member, div);
      }
    }

    if (members.every((x) => x == undefined)) {
      customError.innerText = 'It looks like this system has no public fronters right now. Please check back later!';
      div.appendChild(customError);
    }
  };

async function renderCards(member, div) {
  div.classList.add('member-card-container');

  let memberElement = document.createElement('div');
  memberElement.classList.add('member-card');
  memberElement.setAttribute('member-color', (member.color || '#000'));
  memberElement.setAttribute('member-pronouns', member.pronouns);
  memberElement.setAttribute('member-avatar', member.avatarUrl);
  memberElement.setAttribute('member-desc', member.desc);

  try { 
      let memberAvatar = document.createElement('div');

      if (member.avatarUrl != null) {
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

      let memberPronouns = document.createElement('md-span');
      memberPronouns.classList.add('member-pronouns');
      memberPronouns.classList.add('md-span');
      if (member.pronouns!=null) {
          member.pronouns = toDiscordMarkdown(member.pronouns);
          memberPronouns.innerHTML = DOMPurify.sanitize(member.pronouns);
          memberElement.appendChild(memberPronouns);
      }

      let memberStatus = document.createElement('strong');
      memberStatus.classList.add('member-status');
      if (member.customStatus!=null) {
          memberStatus.innerText = 'Status: ' + member.customStatus;
          memberElement.appendChild(memberStatus);
          console.log(memberStatus.innerText);
      }

      let memberDesc = document.createElement('md-block');
      memberDesc.classList.add('member-desc');
      if (member.desc!=null) {
          member.desc = toDiscordMarkdown(member.desc);
          memberDesc.innerHTML = DOMPurify.sanitize(member.desc);
          memberElement.appendChild(memberDesc);
      }

      div.appendChild(memberElement);
  }
  catch(err) {
      div.innerText = 'Error: ' + err;
  };
}