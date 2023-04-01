export const template =
    `<main class="container">
        <form onsubmit="return false;" id="login-form" class="form">
        
            {{{first_name}}}
            {{{second_name}}}
            {{{login}}}
            {{{email}}}
            {{{phone}}}
            {{{password}}}
            {{{signButton}}}
            <nav>
                <ul>
                    <li>{{{back}}}</li>
                    <li>{{{indexPage}}}</li>
                </ul>
            </nav>
        </form>
    </main>
`
