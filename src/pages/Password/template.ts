export const template =
    `<main class="container">
        <form onsubmit="return false;" id="form" class="form">
            {{{password}}}
            {{{newPassword}}}
<!--            {{{confirmPassword}}}-->
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
