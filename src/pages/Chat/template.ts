export const template =
`
    <main>
        <nav id="users-list-container">
            <section id="users-list">
                    {{{accountData}}}
                    {{{search}}}
                    {{{addChat}}}
                    {{{errorMessage}}}
                    {{{usersCards}}}
            </section>
        </nav>
        <div id="messages-container">
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
