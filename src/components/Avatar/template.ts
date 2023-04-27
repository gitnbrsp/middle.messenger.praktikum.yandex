export const template = `
    {{#if imagePath}}
        <label>
            <img width="{{width}}" height="{{height}}" class="avatar" 
            src="{{imagePath}}" alt="avatar"/>
            <input name="avatar" class="no-display" type="file">
        </label>
    {{else}}
        <label>
            <img width="{{width}}" height="{{height}}" class="avatar"
             src="https://www.svgrepo.com/show/452030/avatar-default.svg" alt="avatar"/>
            <input name="avatar" class="no-display" type="file">
        </label>
    {{/if}}
`
