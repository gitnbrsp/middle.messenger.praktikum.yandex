export const template =
`
    <main>
        <nav id="users-list-container">
            <section id="users-list">
                    {{{accountData}}}
                    {{{search}}}
                    {{{errorMessage}}}
                    {{{usersCards}}}
            </section>
        </nav>
        <div id="messages-container">
        
<!--        Menu, work in progress...     -->
            <header id="messages-container-header">
                {{{chatMenu}}}
            </header>
            
            <div id="messages">
                {{{messages}}}
            </div>
           {{{messageForm}}}
        </div>
    </main>
`
