export const template =
    `
    <main class="container">
        <form onsubmit="return false;" class="form">
            {{{avatar}}}
            {{{first_name}}}
            {{{second_name}}}
            {{{login}}}
            {{{display_name}}}
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
