// API
const getUser = async (user) => {
	const userURI = "https://api.github.com/users/";

	const response = await fetch(userURI + user);

	const data = await response.json();

	return data;
};

// grab everything we need
const form = document.querySelector("form");

const profile = document.querySelector(".github-profile");

// functions
const updateUser = async (user) => {
	const userDetails = await getUser(user);

	return { userDetails };
};

const updateUI = (data) => {
	const userDetails = data.userDetails;

	if (userDetails.name == null) {
		userDetails.name = "Username Not found";
	}

	const dateCreated = new Date(userDetails.created_at);

	const dateUTC = dateCreated
		.toString()
		.replace(/\w+ (\w+) (\d+) (\d+).*/, "$2 $1 $3");

	profile.innerHTML = `
	<div class="profile-information">
	<img class="profile-information__img" src="${userDetails.avatar_url}" alt="">
	<div class="profile-information__text">
		<h3 class="name">${userDetails.name}</h3>
		<p class="username">@${userDetails.login}</p>
		<p class="date-joined">Joined ${dateUTC}</p>
	</div>
</div>
<div class="data-text">${userDetails.bio}</div>
<div class="repos-follows">
	<div class="fol">
		<p class="repos-follows_text">Repos</p>
		<p class="nums repos">${userDetails.public_repos}</p>
	</div>
	<div class="fol">
		<p class="repos-follows_text">Followers</p>
		<p class="nums followers">${userDetails.followers}</p>
	</div>
	<div class="fol">
		<p class="repos-follows_text">Following</p>
		<p class="nums following">${userDetails.following}</p>
	</div>
</div>
<div class="socials">
	<div class="social-item location">
		<svg width="24" height="24" fill="none" viewBox="0 0 24 24">
			<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
				stroke-width="1.5"
				d="M18.25 11C18.25 15 12 19.25 12 19.25C12 19.25 5.75 15 5.75 11C5.75 7.5 8.68629 4.75 12 4.75C15.3137 4.75 18.25 7.5 18.25 11Z">
			</path>
			<circle cx="12" cy="11" r="2.25" stroke="currentColor" stroke-linecap="round"
				stroke-linejoin="round" stroke-width="1.5"></circle>
		</svg>
		<p>${userDetails.location}</p>
	</div>
	<div class="social-item twitter">
		<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-twitter"
			width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
			fill="none" stroke-linecap="round" stroke-linejoin="round">
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path
				d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z" />
		</svg>
		<p>@${userDetails.twitter_username}</p>
	</div>
	<div class="social-item website">
		<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-link" width="24"
			height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none"
			stroke-linecap="round" stroke-linejoin="round">
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5" />
			<path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5" />
		</svg>
		<p>${userDetails.html_url}</p>
	</div>
	<div class="social-item office">
		<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-building-skyscraper"
			width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
			fill="none" stroke-linecap="round" stroke-linejoin="round">
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<line x1="3" y1="21" x2="21" y2="21" />
			<path d="M5 21v-14l8 -4v18" />
			<path d="M19 21v-10l-6 -4" />
			<line x1="9" y1="9" x2="9" y2="9.01" />
			<line x1="9" y1="12" x2="9" y2="12.01" />
			<line x1="9" y1="15" x2="9" y2="15.01" />
			<line x1="9" y1="18" x2="9" y2="18.01" />
		</svg>
		<p>${userDetails.company}</p>
	</div>
</div>
	`;
};

// event listeners
form.addEventListener("submit", (e) => {
	e.preventDefault();

	const user = form.user.value.trim();

	form.reset();

	// update User
	updateUser(user)
		.then((data) => updateUI(data))
		.catch((err) => console.log(err));
});
