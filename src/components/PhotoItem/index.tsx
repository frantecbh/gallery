

import { Container } from './styles';

interface IPhotoProps {
  name: string,
  url: string
}

export const PhotoItem = ({name, url}: IPhotoProps) => {
  return (
    <Container>
        <img src={url} alt={name} />
        <p>{name}</p>
    </Container>

  );
}

