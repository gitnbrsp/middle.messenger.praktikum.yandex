export const template = `
        <ul>
            {{#each chats}}          
                    <li title="right click - menu" id="{{this.id}}" class="user-card {{selected}}"> 
                            <div class="popup">
                                <svg width="400" height="100">
                                    <circle cx="40" cy="50" r="30" fill="{{this.color}}" />
                                    <text x="100" y="50" font-size="30" fill="black">
                                        {{this.title}}
                                    </text>
                                    <text x="100" y="75" font-size="22" fill="gray">
                                        {{this.text}}
                                    </text>
                        <line stroke-width="4px" x1="0" y1="100" x2="400" y2="100" stroke="black" />
                                </svg>
                                <span class="popuptext">
                                    <span class="material-symbols-outlined user-card-icons">
                                        delete
                                    </span>
                                    <span class="material-symbols-outlined user-card-icons">
                                        info
                                    </span>
                                </span>
                            </div>
                    </li>
            {{/each}}
        </ul>
`
