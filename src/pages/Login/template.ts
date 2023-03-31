export const template =
    `<main class="container">
        <form onsubmit="return false;" id="form" class="form">
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
