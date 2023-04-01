export const template = `
        <ul>
            {{#users}}
                <li class="user-card">
                    <svg width="400" height="100">
                        <circle cx="40" cy="50" r="30" fill="{{color}}" />
                        <text x="100" y="50" font-size="30" fill="black">{{this.name}}</text>
                        <text x="100" y="75" font-size="22" fill="gray">{{this.text}}</text>
                        <line stroke-width="4px" x1="0" y1="100" x2="400" y2="100" stroke="black" />
                    </svg>
                </li>
            {{/users}}
        </ul>
`
