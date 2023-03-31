export const template = `
        <svg width="400" height="200">
            <a class="text-link" href="#">
                <text x="10" y="125" font-size="60" onclick="history.pushState({}, '', 'Login');"  
                class="material-symbols-outlined">logout</text>
            </a>
            <circle cx="100" cy="100" r="30" fill="whitesmoke"/>
            <text x="150" y="100" font-size="30" fill="black">{{first_name}}</text>
            <text x="150" y="125" font-size="20" fill="gray">{{email}}</text>
            <text x="350" y="125" font-size="100" onClick="history.pushState({}, '', 'Profile');"  
            class="material-symbols-outlined">manage_accounts</text>
        </svg>
`
