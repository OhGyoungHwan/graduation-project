import tensorflow as tf

from tensorflow_tts.inference import AutoConfig
from tensorflow_tts.inference import TFAutoModel
from tensorflow_tts.inference import AutoProcessor

import numpy as np
import io
import scipy.io.wavfile


english_tacotron2_conf_path = "/home/ubuntu/api/speech_model/tacotron2.v1.yaml"
english_mb_melgan_conf_path = "/home/ubuntu/api/speech_model/multiband_melgan.v1.yaml"
english_tacotron2_conf = AutoConfig.from_pretrained(english_tacotron2_conf_path)
english_mb_melgan_conf = AutoConfig.from_pretrained(english_mb_melgan_conf_path)

english_processor = AutoProcessor.from_pretrained("tensorspeech/tts-tacotron2-ljspeech-en")

english_tacotron2 = TFAutoModel.from_pretrained(
    pretrained_path='/home/ubuntu/api/speech_model/tacotron2-120k.h5',
    config=english_tacotron2_conf,
    name="tacotron2"
)
english_mb_melgan = TFAutoModel.from_pretrained(
    pretrained_path='/home/ubuntu/api/speech_model/mb.melgan-generator-940k.h5',
    config=english_mb_melgan_conf,
    name="MB-MELGAN"
)


def save_wav(wav, path, rate=24000):
    wav_norm = wav * (32767 / max(0.01, np.max(np.abs(wav))))
    scipy.io.wavfile.write(path, rate, wav_norm.astype(np.int16))


def english_do_synthesis(input_text, text2mel_model, vocoder_model, text2mel_name, vocoder_name):
    input_ids = english_processor.text_to_sequence(input_text)

    # text2mel part
    if text2mel_name == "TACOTRON":
        _, mel_outputs, stop_token_prediction, alignment_history = text2mel_model.inference(
            tf.expand_dims(tf.convert_to_tensor(input_ids, dtype=tf.int32), 0),
            tf.convert_to_tensor([len(input_ids)], tf.int32),
            tf.convert_to_tensor([0], dtype=tf.int32)
        )
    else:
        raise ValueError("Only TACOTRON are supported on text2mel_name")

    # vocoder part
    if vocoder_name == "MB-MELGAN":
        audio = vocoder_model.inference(mel_outputs)[0, :, 0]
    else:
        raise ValueError("Only MB_MELGAN are supported on vocoder_name")

    if text2mel_name == "TACOTRON":
        return mel_outputs.numpy(), alignment_history.numpy(), audio.numpy()
    else:
        return mel_outputs.numpy(), audio.numpy()


def get_english_audios_buf(script):
    english_tacotron2.setup_window(win_front=10, win_back=10)
    _, _, audios = english_do_synthesis(script, english_tacotron2, english_mb_melgan, "TACOTRON", "MB-MELGAN")

    buf = io.BytesIO()
    save_wav(audios, buf, 22050)
    buf.seek(0)

    return buf
