export const template = `
        <form id="message-form" class="form">
            <label class="material-symbols-outlined">attach_file
                <input name="attached_file" type="file" class="no-display">
            </label>
            
            <textarea placeholder="Enter - submit, Shift+Enter - new line" name="message"
             id="message-text" class="form-input" autofocus autocomplete="on"></textarea>
             
            <button id="send-message" class="material-symbols-outlined">mail</button>
        </form>
`
