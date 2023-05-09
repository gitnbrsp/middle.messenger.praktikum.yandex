export const template = `
        <div style="display: flex">
            <span id="logout" title="logout" class="material-symbols-outlined account-icons">
                logout
            </span>
            <div>
                {{{avatar}}}
            </div>
            <div>
                <label class="info">{{display_name}}</label><br>
                <label class="info-secondary">{{email}}</label>
            </div>
            <span id="edit" title="edit profile" class="material-symbols-outlined account-icons">
                manage_accounts
            </span>
        </div>
`
