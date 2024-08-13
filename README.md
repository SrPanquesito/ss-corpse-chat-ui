<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="src/assets/images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Corpse Chat Web UI</h3>

  <p align="center">
    Web chat application.
    <br />
    Version: Monolithic Alpha.
    <br /><br />
    <a href="https://github.com/github_username/repo_name">View Demo</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

CorpseChat: The Dark Side of Conversation
Welcome to CorpseChat, the ultimate chat application for those who embrace the edgy, the bold, and the unconventional. If you’re tired of the same old boring social apps and crave a space where you can truly be yourself—without the filters and the fluff—then CorpseChat is where you belong.

🌑 What Makes CorpseChat Different?
**1. **🖤 Dark Mode Only: Immerse yourself in our ultra-sleek, minimalist dark mode interface designed to reflect your inner edge. No blinding whites, just deep blacks and sharp contrasts for an experience that’s as intense as you are.

**2. **🔥 Rebel with a Cause: Share and discover content that breaks the mold. From dark humor memes to underground music tracks and provocative art, CorpseChat is the place for those who live on the fringes of mainstream culture.

**3. **💬 Unfiltered Conversations: Here, you can express yourself freely. No censorship, no judgment. Engage in raw, unfiltered discussions about controversial topics, conspiracy theories, or the things you’re not allowed to say elsewhere.

**4. **🎭 Anonymous Chat Options: Want to keep your identity hidden? Go incognito with our anonymous chat feature. Create aliases, join hidden rooms, and explore topics without the constraints of your everyday persona.

**5. **🖤 Dark Themes & Custom Avatars: Personalize your presence with a range of edgy themes and avatars. Choose from our extensive library of dark-themed designs or upload your own for a truly unique touch.

**6. **💀 Mysterious Challenges & Games: Engage in interactive games and challenges that push boundaries and test your wit. Whether it’s a scavenger hunt for hidden content or thought-provoking debates, CorpseChat keeps the adrenaline pumping.

**7. **🔗 Underground Communities: Connect with niche communities that cater to your specific interests and subcultures. From dark fantasy enthusiasts to underground activists, find your tribe and dive deep into your passions.

**8. **📜 Stories and Secrets: Share anonymous stories, secrets, or confessions. Explore others’ tales of intrigue and scandal in a safe space where everyone can be vulnerable without revealing their identity.

**9. **⚔️ Rogue Moderation: We don’t stifle creativity—our moderation is minimal and non-intrusive. We believe in self-regulation among users, so you can maintain your freedom while respecting basic community guidelines.

**10. **🔮 Future Updates: We’re always evolving. Expect new features and themes that challenge norms and push boundaries. CorpseChat isn’t just an app—it’s a movement.

Join the Dark Side
Ready to break free from the mundane and explore the depths of conversation? Download CorpseChat now and become part of a community where being edgy isn’t just accepted—it’s celebrated.

Unleash your true self. Embrace the darkness.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![React][React.js]][React-url]
* [![Tailwind][Tailwind.css]][Tailwind-url]
* [![Socket.io][Socket.io]][Socket-url]

Icons used:
[https://heroicons.com/](https://heroicons.com/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- ROADMAP -->
## Roadmap (Finished tasks)

- [x] Routing and context configuration
- [x] Tailwind configuration (Palette, fonts, etc)
- [x] Darkmode configuration
- [x] Configure linter
- [x] Register page
    - [x] CSS
    - [x] Form handling
    - [x] Backend connection
- [x] Login page
    - [x] CSS
    - [x] Form handling
    - [x] Backend connection
- [x] Configure material tailwind to use alert pop-up for errors
- [x] Protect and redirect routes
- [x] Retrieve user data from localStorage JWT
- [x] UI for ChatLayout and separate into components
- [x] Move Darkmode button to Contact Details header, left side of information button
- [x] Added emoji picker
- [x] Display selected emoji in MessageInput
- [x] Change jwt from localStorage to cookies
- [x] Retrieve messages for each convo and display them
- [x] Display images in messages
- [x] Smooth scroll when sending message, clear input field, hide emoji picker when clicked outside component
- [x] Show selected image before sending message (one image only for now)
- [x] Create css bubble dialog style for image previewer
- [x] Adjust image previewer to render absolute position according to the width of the screen
- [x] Show last message sent (conversation list)
- [x] Notification alert in top right side
- [x] Logout
- [x] Configure husky pre-commit with linter
- [x] Fix linter errors and warnings
- [x] Configure jest
- [x] Migrate to webpack

## To-Do

- [ ] Deploy build to AWS so we can be sure webpack migration worked
- [ ] Change react-alert for notification absolute on login and register actions
- [ ] Unit tests 90% + coverage
- [ ] Form validation in Register page
- [ ] Limit calls to BE in Register page
- [ ] Form validation in Login page
- [ ] Limit calls to BE in Login page
- [ ] Limit calls to BE when sending message
- [ ] Send more than 1 image
- [ ] File handling

See the [open issues](https://github.com/github_username/repo_name/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

Mocking modules with vite-jest is different from commonjs tests. Please read next information before working on tests.
[https://github.com/sodatea/vite-jest/tree/main/packages/vite-jest#limitations-and-differences-with-commonjs-tests](https://github.com/sodatea/vite-jest/tree/main/packages/vite-jest#limitations-and-differences-with-commonjs-tests)

### Installation

1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo
   ```sh
   git clone https://github.com/github_username/repo_name.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `config.js`
   ```js
   const API_KEY = 'ENTER YOUR API';
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Your Name - [@twitter_handle](https://twitter.com/twitter_handle) - email@email_client.com

Project Link: [https://github.com/github_username/repo_name](https://github.com/github_username/repo_name)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* []()
* []()
* []()

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Tailwind.css]: https://img.shields.io/badge/Tailwind-011f4b?style=for-the-badge&logo=tailwindcss&logoColor=06B6D4
[Tailwind-url]: https://tailwindcss.com/
[Socket.io]: https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=fff
[Socket-url]: https://socket.io/