# creative-text-generator

## Como utilizar
- Clone o projeto para seu computador
  ```bash
  $ git clone https://github.com/pamella/creative-text-generator.git
  ```
- Inicie um ambiente virtual e instale as dependências

  :warning: Importante usar Python 3.6 ou 3.7 para evitar problema de compatibilidade de versão com o `tensorflow`.

  ```bash
  $ python3 -m venv env
  $ source env/bin/activate (Linux/Mac) OR env\Scripts\activate (Windows)
  $ pip install -r requirements.txt
  
  # Como a versão do textgenrnn não está atualizada no pip, instale diretamente pelo git clone
  $ git clone https://github.com/minimaxir/textgenrnn.git
  $ cd textgenrnn
  $ python setup.py install
  ```
 
- Rode as migrações
  ```bash
  $ python manage.py migrate
  ```

- Inicie o servidor
  ```bash
  $ python manage.py runserver
  ```
  
## Possíveis problemas e como corrigí-los

Lista com soluções sugeridas de problemas conhecidos que podem ocorrer durante a instalação das depedências do projeto.

- [ERROR: Could not find a version that satisfies the requirement tensorflow](https://stackoverflow.com/a/59653873)
- [Keras: AttributeError: 'str' object has no attribute 'decode'](https://github.com/keras-team/keras/issues/14265)
