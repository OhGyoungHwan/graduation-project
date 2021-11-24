from transformers import BlenderbotTokenizer, BlenderbotForConditionalGeneration
mname = 'facebook/blenderbot-400M-distill'
model = BlenderbotForConditionalGeneration.from_pretrained(mname)
tokenizer = BlenderbotTokenizer.from_pretrained(mname)


def list_to_string(list):
    token_include_string = ""
    
    for element in list:
        if type(element) == str:
            token_include_string += "<s>" + element + "</s>"
    
    token_include_string = token_include_string.lstrip("<s>")
    token_include_string = token_include_string.rstrip("</s>")

    return token_include_string


def request_blenderbot(conversation_list):
    conversation = list_to_string(conversation_list)
    
    inputs = tokenizer([conversation], return_tensors='pt')
    reply_ids = model.generate(**inputs)
    return tokenizer.batch_decode(reply_ids, skip_special_tokens=True)[0]
