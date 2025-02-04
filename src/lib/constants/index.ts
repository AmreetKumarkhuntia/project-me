import type {
  Database,
  Framework,
  Language,
  Tool,
} from "$generated/types/Projects.ts";

// SVGS
export const twitter: string = `
<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 30 30">
  <path d="M26.37,26l-8.795-12.822l0.015,0.012L25.52,4h-2.65l-6.46,7.48L11.28,4H4.33l8.211,11.971L12.54,15.97L3.88,26h2.65 l7.182-8.322L19.42,26H26.37z M10.23,6l12.34,18h-2.1L8.12,6H10.23z" ></path>
</svg>
`;

export const discord: string = `
<svg fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M18.942 5.556a16.299 16.299 0 0 0-4.126-1.297c-.178.321-.385.754-.529 1.097a15.175 15.175 0 0 0-4.573 0 11.583 11.583 0 0 0-.535-1.097 16.274 16.274 0 0 0-4.129 1.3c-2.611 3.946-3.319 7.794-2.965 11.587a16.494 16.494 0 0 0 5.061 2.593 12.65 12.65 0 0 0 1.084-1.785 10.689 10.689 0 0 1-1.707-.831c.143-.106.283-.217.418-.331 3.291 1.539 6.866 1.539 10.118 0 .137.114.277.225.418.331-.541.326-1.114.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595c.415-4.396-.709-8.209-2.973-11.589zM8.678 14.813c-.988 0-1.798-.922-1.798-2.045s.793-2.047 1.798-2.047 1.815.922 1.798 2.047c.001 1.123-.793 2.045-1.798 2.045zm6.644 0c-.988 0-1.798-.922-1.798-2.045s.793-2.047 1.798-2.047 1.815.922 1.798 2.047c0 1.123-.793 2.045-1.798 2.045z"></path></g></svg>
`;

export const linkedIn: string = `
<svg width="101px" height="101px" viewBox="-35.84 -35.84 327.68 327.68" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M218.123122,218.127392 L180.191928,218.127392 L180.191928,158.724263 C180.191928,144.559023 179.939053,126.323993 160.463756,126.323993 C140.707926,126.323993 137.685284,141.757585 137.685284,157.692986 L137.685284,218.123441 L99.7540894,218.123441 L99.7540894,95.9665207 L136.168036,95.9665207 L136.168036,112.660562 L136.677736,112.660562 C144.102746,99.9650027 157.908637,92.3824528 172.605689,92.9280076 C211.050535,92.9280076 218.138927,118.216023 218.138927,151.114151 L218.123122,218.127392 Z M56.9550587,79.2685282 C44.7981969,79.2707099 34.9413443,69.4171797 34.9391618,57.260052 C34.93698,45.1029244 44.7902948,35.2458562 56.9471566,35.2436736 C69.1040185,35.2414916 78.9608713,45.0950217 78.963054,57.2521493 C78.9641017,63.090208 76.6459976,68.6895714 72.5186979,72.8184433 C68.3913982,76.9473153 62.7929898,79.26748 56.9550587,79.2685282 M75.9206558,218.127392 L37.94995,218.127392 L37.94995,95.9665207 L75.9206558,95.9665207 L75.9206558,218.127392 Z M237.033403,0.0182577091 L18.8895249,0.0182577091 C8.57959469,-0.0980923971 0.124827038,8.16056231 -0.001,18.4706066 L-0.001,237.524091 C0.120519052,247.839103 8.57460631,256.105934 18.8895249,255.9977 L237.033403,255.9977 C247.368728,256.125818 255.855922,247.859464 255.999,237.524091 L255.999,18.4548016 C255.851624,8.12438979 247.363742,-0.133792868 237.033403,0.000790807055"> </path> </g> </g></svg>
`;

export const github: string = `
<svg viewBox="-2.5 0 19 19" xmlns="http://www.w3.org/2000/svg" class="cf-icon-svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M9.464 17.178a4.506 4.506 0 0 1-2.013.317 4.29 4.29 0 0 1-2.007-.317.746.746 0 0 1-.277-.587c0-.22-.008-.798-.012-1.567-2.564.557-3.105-1.236-3.105-1.236a2.44 2.44 0 0 0-1.024-1.348c-.836-.572.063-.56.063-.56a1.937 1.937 0 0 1 1.412.95 1.962 1.962 0 0 0 2.682.765 1.971 1.971 0 0 1 .586-1.233c-2.046-.232-4.198-1.023-4.198-4.554a3.566 3.566 0 0 1 .948-2.474 3.313 3.313 0 0 1 .091-2.438s.773-.248 2.534.945a8.727 8.727 0 0 1 4.615 0c1.76-1.193 2.532-.945 2.532-.945a3.31 3.31 0 0 1 .092 2.438 3.562 3.562 0 0 1 .947 2.474c0 3.54-2.155 4.32-4.208 4.548a2.195 2.195 0 0 1 .625 1.706c0 1.232-.011 2.227-.011 2.529a.694.694 0 0 1-.272.587z"></path></g></svg>
`;

export const instagram: string = `
<svg viewBox="-1.2 -1.2 26.40 26.40" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" ></path> <path d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z" ></path> </g></svg>
`;

export const youtube: string = `
<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
<path d="M43.2,33.9c-0.4,2.1-2.1,3.7-4.2,4c-3.3,0.5-8.8,1.1-15,1.1c-6.1,0-11.6-0.6-15-1.1c-2.1-0.3-3.8-1.9-4.2-4C4.4,31.6,4,28.2,4,24c0-4.2,0.4-7.6,0.8-9.9c0.4-2.1,2.1-3.7,4.2-4C12.3,9.6,17.8,9,24,9c6.2,0,11.6,0.6,15,1.1c2.1,0.3,3.8,1.9,4.2,4c0.4,2.3,0.9,5.7,0.9,9.9C44,28.2,43.6,31.6,43.2,33.9z"></path><path fill="#000000" d="M20 31L20 17 32 24z"></path>
</svg>
`;

export const work: string = `
<svg width="199px" height="199px" viewBox="-0.72 -0.72 25.44 25.44" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.048"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12H3V8C3 6.89543 3.89543 6 5 6H9M4 12V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V12M4 12H10M20 12H21V8C21 6.89543 20.1046 6 19 6H15M20 12H14M14 12V10H10V12M14 12V14H10V12M9 6V5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V6M9 6H15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
`;

export const education: string = `
<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="256px" height="256px" viewBox="-24.33 -24.33 352.73 352.73" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M239.156,184.149c0-13.929-11.329-25.265-25.259-25.265c-13.919,0-25.254,11.336-25.254,25.265 c0,13.919,11.335,25.249,25.254,25.249C227.827,209.388,239.156,198.068,239.156,184.149z"></path> <path d="M185.802,243.148c-0.602,2.725,0.398,3.236,2.257,1.15l8.233-9.279c1.854-2.087,3.873-1.585,4.521,1.139l3.351,14.157 c0.652,2.719,1.595,2.692,2.123-0.041l7.177-37.376c-0.187,0.01-0.362,0.031-0.554,0.031c-7.338,0-13.919-3.159-18.538-8.156 L185.802,243.148z"></path> <path d="M222.752,261.687l3.656-11.423c0.849-2.661,2.941-3.034,4.671-0.85l8.047,10.17c1.729,2.195,2.729,1.74,2.227-1.01 l-9.549-52.128c-4.401,4.116-10.284,6.67-16.746,6.778l5.582,48.255C220.95,264.239,221.903,264.338,222.752,261.687z"></path> <path d="M285.511,40.457H18.558C8.326,40.457,0,48.57,0,58.544v174.15c0,9.973,8.326,18.087,18.558,18.087h162.656l-1.108-1.253 c-1.869-2.319-2.403-5.339-1.601-8.948l1.274-5.706H18.558c-1.437,0-2.651-1.004-2.651-2.18V58.544c0-1.184,1.214-2.18,2.651-2.18 h266.953c1.435,0,2.651,0.997,2.651,2.18v174.15c0,1.186-1.217,2.18-2.651,2.18h-39.799l2.921,15.907h36.878 c10.232,0,18.559-8.108,18.559-18.087V58.544C304.069,48.57,295.743,40.457,285.511,40.457z"></path> <path d="M269.376,222.944c5.856,0,10.604-4.754,10.604-10.605V77.304c0-5.854-4.748-10.604-10.604-10.604H32.097 c-5.854,0-10.605,4.751-10.605,10.604v135.035c0,5.852,4.751,10.605,10.605,10.605h150.276l4.557-20.423 c-3.728-5.37-5.924-11.863-5.924-18.879c0-18.315,14.903-33.213,33.213-33.213s33.207,14.897,33.207,33.213 c0,7.933-2.801,15.218-7.462,20.935l3.355,18.361h26.057V222.944z M48.449,92.383h199.718c1.465,0,2.65,1.188,2.65,2.651 s-1.186,2.651-2.65,2.651H48.449c-1.463,0-2.651-1.188-2.651-2.651S46.986,92.383,48.449,92.383z M48.449,131.478 c-1.463,0-2.651-1.188-2.651-2.651s1.188-2.651,2.651-2.651h199.718c1.465,0,2.65,1.188,2.65,2.651s-1.186,2.651-2.65,2.651 H48.449z"></path> </g> </g> </g></svg>
`;

// export languages here for devicon

/*

<link rel="stylesheet" type='text/css' href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
        
Languages:
Language: Java - devicon-java-plain
Language: JavaScript - devicon-javascript-plain
Language: Python - devicon-python-plain
Language: C - devicon-c-plain
Language: C++ - devicon-cplusplus-plain
Language: Ruby - devicon-ruby-plain
Language: PHP - devicon-php-plain
Language: Go - devicon-go-plain
Language: Swift - devicon-swift-plain
Language: Kotlin - devicon-kotlin-plain
Language: Rust - devicon-rust-plain
Language: TypeScript - devicon-typescript-plain
Language: HTML5 - devicon-html5-plain
Language: CSS3 - devicon-css3-plain
Language: Sass - devicon-sass-original
Language: R - devicon-r-plain
Language: Shell - devicon-shell-plain
Language: Scala - devicon-scala-plain
Language: Perl - devicon-perl-plain
Language: Lua - devicon-lua-plain
Language: Objective-C - devicon-objectivec-plain
Language: Groovy - devicon-groovy-plain

Frameworks & Tools:
Framework: Node.js - devicon-nodejs-plain
Framework: React - devicon-react-original
Framework: Angular - devicon-angularjs-plain
Framework: Vue.js - devicon-vuejs-plain
Framework: Django - devicon-django-plain
Framework: Spring - devicon-spring-plain
Framework: Laravel - devicon-laravel-plain
Framework: Ruby on Rails - devicon-rails-plain
Framework: Bootstrap - devicon-bootstrap-plain
Framework: JQuery - devicon-jquery-plain

Tools:
Tool: Git - devicon-git-plain
Tool: Docker - devicon-docker-plain
Tool: Kubernetes - devicon-kubernetes-plain
Tool: AWS - devicon-aws-plain
Tool: MongoDB - devicon-mongodb-plain
Tool: MySQL - devicon-mysql-plain
Tool: PostgreSQL - devicon-postgresql-plain
Tool: Firebase - devicon-firebase-plain
Tool: GraphQL - devicon-graphql-plain
*/

// Language and Framework Mapping to devicon classes
export const techIconMap: Map<Language | Framework | Tool | Database, string> =
  new Map([
    // Languages
    ["c#", "devicon-csharp-plain"],
    ["java", "devicon-java-plain"],
    ["javascript", "devicon-javascript-plain"],
    ["python", "devicon-python-plain"],
    ["c", "devicon-c-plain"],
    ["cpp", "devicon-cplusplus-plain"],
    ["ruby", "devicon-ruby-plain"],
    ["php", "devicon-php-plain"],
    ["go", "devicon-go-plain"],
    ["swift", "devicon-swift-plain"],
    ["kotlin", "devicon-kotlin-plain"],
    ["rust", "devicon-rust-plain"],
    ["typescript", "devicon-typescript-plain"],
    ["html", "devicon-html5-plain"],
    ["css", "devicon-css3-plain"],
    ["sass", "devicon-sass-original"],
    ["purescript", "devicon-purescript-plain"],
    ["haskell", "devicon-haskell-plain"],
    ["yaml", "devicon-yaml-plain"],

    // Frameworks
    ["react", "devicon-react-original"],
    ["angular", "devicon-angularjs-plain"],
    ["vue", "devicon-vuejs-plain"],
    ["spring", "devicon-spring-plain"],
    ["django", "devicon-django-plain"],
    ["express", "devicon-express-original"],
    ["ember", "devicon-ember-plain"],
    ["flask", "devicon-flask-plain"],
    ["ruby-on-rails", "devicon-rails-plain"],
    ["laravel", "devicon-laravel-plain"],
    ["next.js", "devicon-nextjs-plain"],
    ["svelte", "devicon-svelte-plain"],
    ["asp.net", "devicon-aspnet-plain"],
    ["fastapi", "devicon-fastapi-plain"],
    ["servant", "devicon-haskell-plain"],
    ["yesod", "devicon-yesod-plain"],
    ["snap", "devicon-snap-plain"],
    ["spock", "devicon-spock-plain"],
    ["play", "devicon-play-plain"],
    ["hspec", "devicon-hspec-plain"],
    ["jinja", "devicon-jinja-plain"],
    ["bootstrap", "devicon-bootstrap-plain"],
    ["tailwind", "devicon-tailwindcss-plain"],
    ["material-ui", "devicon-materialui-plain"],
    ["foundation", "devicon-foundation-plain"],
    ["semantic-ui", "devicon-semanticui-plain"],
    ["nuxt.js", "devicon-nuxtjs-plain"],
    ["nuxt3", "devicon-nuxt3-plain"],
    ["flask-admin", "devicon-flask-admin-plain"],
    ["quasar", "devicon-quasar-plain"],
    ["blazor", "devicon-blazor-plain"],
    ["graphql", "devicon-graphql-plain"],

    // Tools
    ["git", "devicon-git-plain"],
    ["docker", "devicon-docker-plain"],
    ["kubernetes", "devicon-kubernetes-plain"],
    ["aws", "devicon-amazonwebservices-plain-wordmark"],

    // DB
    ["mongodb", "devicon-mongodb-plain"],
    ["mysql", "devicon-mysql-plain"],
    ["postgresql", "devicon-postgresql-plain"],
    ["firebase", "devicon-firebase-plain"],
    ["redis", "devicon-redis-plain-wordmark"],
  ]);

// Colors Mapping
export const techColorMap: Map<Language | Framework | Tool | Database, string> =
  new Map([
    // Languages
    ["c#", "#9E7EBA"],
    ["java", "#B07219"],
    ["javascript", "#F0DB4F"],
    ["python", "#306998"],
    ["c", "#A8B9CC"],
    ["cpp", "#00599C"],
    ["ruby", "#D91404"],
    ["php", "#787CB5"],
    ["go", "#29BEB0"],
    ["swift", "#F05138"],
    ["kotlin", "#7F52FF"],
    ["rust", "#DEA584"],
    ["typescript", "#2B7489"],
    ["html", "#E44D26"],
    ["css", "#1572B6"],
    ["sass", "#CC6699"],
    ["purescript", "#1C2124"],
    ["haskell", "#5D4F85"],
    ["yaml", "#CB171E"],

    // Frameworks
    ["react", "#61DBFB"],
    ["angular", "#B52E31"],
    ["vue", "#42B883"],
    ["spring", "#6DB33F"],
    ["django", "#092E20"],
    ["express", "#20232A"],
    ["ember", "#E64A19"],
    ["flask", "#20232A"],
    ["ruby-on-rails", "#C7151D"],
    ["laravel", "#FF2D20"],
    ["next.js", "#000000"],
    ["svelte", "#FF3E00"],
    ["asp.net", "#512BD4"],
    ["fastapi", "#009688"],
    ["servant", "#5D4F85"],
    ["yesod", "#5D4F85"],
    ["snap", "#5D4F85"],
    ["spock", "#5D4F85"],
    ["play", "#78C100"],
    ["hspec", "#5D4F85"],
    ["jinja", "#B41717"],
    ["bootstrap", "#563D7C"],
    ["tailwind", "#38B2AC"],
    ["material-ui", "#0081CB"],
    ["foundation", "#3B5998"],
    ["semantic-ui", "#35BDB2"],
    ["nuxt.js", "#00C58E"],
    ["nuxt3", "#00C58E"],
    ["flask-admin", "#20232A"],
    ["quasar", "#1976D2"],
    ["blazor", "#763D80"],
    ["graphql", "#E535AB"],

    // Tools
    ["git", "#F54D27"],
    ["docker", "#0DB7ED"],
    ["kubernetes", "#326CE5"],
    ["aws", "#FF9900"],

    // DB
    ["mongodb", "#47A248"],
    ["mysql", "#00758F"],
    ["postgresql", "#336791"],
    ["firebase", "#FFCA28"],
    ["redis", "#D82C20"],
  ]);
