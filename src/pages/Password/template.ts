export const template =
    `<main class="container">
        <form onsubmit="return false;" id="form" class="form">
            {{{old_password}}}
            {{{new_password}}}
            {{{confirm_password}}}
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
