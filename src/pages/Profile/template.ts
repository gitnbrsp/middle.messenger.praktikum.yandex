export const template =
    `<main class="container">
        <form onsubmit="return false;" id="login-form" class="form">
            <label>
                <span class="material-symbols-outlined">photo_camera</span>
                <input name="avatar" class="no-display" type="file">
            </label>
            {{{first_name}}}
            {{{second_name}}}
            {{{display_name}}}
            {{{login}}}
            {{{email}}}
            {{{phone}}}
            {{{signButton}}}
            <nav>
                <ul>
                    <li>{{{back}}}</li>
                    <li>{{{changePassword}}}</li>
                    <li>{{{indexPage}}}</li>
                </ul>
            </nav>
        </form>
    </main>
`
