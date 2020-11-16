from textgenrnn import textgenrnn


# https://github.com/minimaxir/textgenrnn/blob/ee8b9e806d109c25566581f358a4a72b6f03929a/textgenrnn/textgenrnn.py#L84
def generate_text_from_cache(artists_names):
    trained_model_base_file_name = get_trained_model_base_file_name(artists_names)

    textgen = textgenrnn(
        weights_path=f"core/data/trained_models/{trained_model_base_file_name}_weights.hdf5",
        vocab_path=f"core/data/trained_models/{trained_model_base_file_name}_vocab.json",
        config_path=f"core/data/trained_models/{trained_model_base_file_name}_config.json",
    )
    return textgen.generate(3, temperature=1.0, return_as_list=True)


def get_trained_model_base_file_name(artists_names):
    return '_'.join(sorted(artists_names))


def merge_txt_files(artists_names):
    output_file_name = '_'.join(sorted(artists_names))
    merged_data = ""

    for artist_name in artists_names:
        with open(ARTIST_LYRICS_FILES_MAP[artist_name], encoding='utf-8') as fp:
            merged_data += fp.read()

    with open (f'{output_file_name}.txt', 'w', encoding='utf-8') as fp:
        fp.write(merged_data)

    return f'{output_file_name}.txt'
