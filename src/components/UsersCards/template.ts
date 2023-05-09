export const template = `
        <ul>
            {{#each chats}}          
                    <li id="{{this.id}}" class="{{selected}}"> 
                            <div class="popup user-card">
                                <div>
                                    <label>
                                        {{#if this.imagePath}}
                                            <img width="70" height="70" class="avatar" 
                                            src="{{this.imagePath}}" alt="group avatar"/>
                                        {{else}}
                                            <img width="70" height="70" class="avatar"
                                            src="https://www.svgrepo.com/show/345404/group-2.svg"
                                            alt="group avatar"/>
                                        {{/if}}
                                    </label>
                                </div>
                                <div>
                                    <label class="info">{{this.title}}</label><br>
                                    <label class="info-secondary">{{this.lastMessage}}</label>
                                </div>
                                <span class="popuptext">
                                    <span  
                                    title="delete"
                                    class="material-symbols-outlined user-card-icons">
                                        delete
                                    </span>
                                    <span
                                    title="chat info" 
                                    class="material-symbols-outlined user-card-icons">
                                        info
                                    </span>
                                    <span 
                                    title="change image"
                                    class="material-symbols-outlined user-card-icons">
                                        image
                                    </span>
                                </span>
                            </div>
                            <hr>
                    </li>
            {{/each}}
        </ul>
`
