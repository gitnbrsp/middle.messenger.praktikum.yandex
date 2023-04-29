export const template =
`
<div style="display: flex">
<!--    <span class="chat-title">{{title}}</span>-->
    <input class="material-symbols-outlined spoiler-button" type="button"
    title="toggle menu"
     value="chevron_right" 
     onclick="this.value = this.value === 'chevron_left' ? 'chevron_right':'chevron_left'">

    <div class="spoiler">
        <span class="material-symbols-outlined menu-icons" title="delete chat">delete</span>
        <span class="material-symbols-outlined menu-icons" title="info">info</span>
        <span class="material-symbols-outlined menu-icons" title="add user">person_add</span>
        <span class="material-symbols-outlined menu-icons" title="remove user">person_remove</span>
        <span class="material-symbols-outlined menu-icons" title="close chat">cancel</span>
    </div>
    
    <div class="modal" id="add_user_modal">
    <h1 onclick="this.parentNode.style.visibility='hidden'">X</h1>
        Type user login to add
        {{{search_add}}}
    </div> 
       
    <div class="modal" id="remove_user_modal">
    <h1 onclick="this.parentNode.style.visibility='hidden'">X</h1>
    Click user to delete
        <ul id="users_to_remove">
            <li> </li>
        </ul>
    </div>
</div>
`
