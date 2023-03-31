export const template =
`
    <main>
        <div id="column1">
            <section id="users-lsit">
                    {{{accountData}}}
                    <div>
                        <input id="search"  class="form-search" 
                        placeholder="🔍 поиск ..." type="text">
                    </div>
                    {{{userCards}}}
            </section>
        </div>
        <div id="column2">
            <section id="user-info" class="form"></section>
            <section id="messages">
                <div class="form"><h2>Выберите чат</h2></div>
                {{{indexPage}}}
            </section>
               {{{messageForm}}}
        </div>
    </main>
`
