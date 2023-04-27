export const template = `
    <div style="height: 90%">
            <ul>
            {{#each messages}}
                   
                        {{#if this.author}}
                            <div title="{{this.time}}" class="message-container right">
                                {{#if this.isFile}}
                                    <li><div class="message">
                                        <a target="_blank" href="{{this.link}}">
                                            <span class="material-symbols-outlined">
                                                draft
                                            </span>
                                            {{this.file.filename}}
                                            ({{this.file.content_size}} B)
                                        </a>
                                    </div></li>   
                                {{else}}
                                    <li><div class="message">{{this.content}}</div></li>
                                {{/if}}
                            </div>
                        {{else}}
                            <div title="{{this.time}}" class="message-container left">
                                {{#if this.isFile}}
                                    <li><div class="message">
                                        <a target="_blank" href="{{this.link}}">
                                            <span class="material-symbols-outlined">
                                                draft
                                            </span>
                                            {{this.file.filename}}
                                            ({{this.file.content_size}} B)
                                        </a>
                                    </div></li>   
                                {{else}}
                                    <li><div class="message">{{this.content}}</div></li>
                                {{/if}}
                            </div>
                        {{/if}}
            {{/each}}
            </ul>
    </div>
`
