export const template =
    `<main class="container">
        <form onsubmit="return false;" class="form">
            {{{warning}}}

            {{{login}}}
            {{{password}}}
            {{{signButton}}}
            <nav>
                <ul>
                    <li>{{{createAccount}}}</li>
                    <li>{{{indexPage}}}</li>
                </ul>
            </nav>
        </form>
    </main>
`
