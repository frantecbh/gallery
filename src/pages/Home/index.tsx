

 import { FormEvent, useEffect, useState } from 'react';
import { PhotoItem } from '../../components/PhotoItem';
import * as Photos from '../../services/photos';
import { Photo } from '../../types/Photo';
import { Area, Container, Header, PhotoList, ScreenWarning, UploadForm } from './styles';

export function Home(){
  const [uploading, setUpLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState<Photo[]>([])
  const [img, setImg] = useState()

  useEffect(()=>{

    const getPhotos = async () => {
      
      setLoading(true)
      let teste = await Photos.getAll()
      console.log(teste)
      setPhotos(await Photos.getAll())
      setLoading(false)

    }

    getPhotos()

  },[])


  const handleformSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const formData = new FormData(e.currentTarget)
      const file = formData.get('image') as File;

      if(file && file.size > 0){

        setUpLoading(true)
        let result = await Photos.insert(file)

        setUpLoading(false)
     
        if(result instanceof Error){
            alert(`${result.name} - ${result.message}`)
        }else{
          let newPhotoList = [...photos];
          newPhotoList.push(result)
          setPhotos(newPhotoList)
        }

      }



  }

 
  return (
    <Container>
    <Area>
      <Header>
        Galeria de Fotos
      </Header>

      {/* Area de upload */}

    <UploadForm onSubmit={handleformSubmit}>
        <input type="file" name="image"  />
    
        {uploading ? <p>Enviando...</p> : <input type="submit" value="Enviar" /> }
    </UploadForm>



      {
        loading  && 
        <ScreenWarning>
            <div className="emoji">👋</div>
            <div>Carregando...</div>
        </ScreenWarning>
      }

      {
        !loading && photos.length > 0 &&
        <PhotoList>
            {photos.map((photo) =>(
           
              <PhotoItem key={photo.name}  url={photo.url} name={photo.name} />

            ))}
        </PhotoList>
      }

{
        !loading && photos.length === 0 &&
        <ScreenWarning>
        <div className="emoji">😌</div>
        <div>Você nao possui photos cadastradas</div>
    </ScreenWarning>


}


      {/* Lista de fotos */}
    </Area>
  </Container>
  );
}

