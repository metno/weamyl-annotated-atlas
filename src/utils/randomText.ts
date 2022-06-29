const txt1 =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nibh nunc, sollicitudin vel arcu vitae, maximus eleifend tellus. Maecenas dolor diam, lobortis eget ipsum ut, bibendum accumsan tortor. Nulla eu neque eget mauris sagittis porta. Praesent eleifend felis at augue facilisis pharetra. Maecenas congue vestibulum suscipit. Phasellus id nisl quis orci rhoncus tempus. Cras a lobortis quam, in fermentum turpis. Suspendisse venenatis mattis interdum. Nam viverra diam non purus hendrerit molestie. Proin ac tortor massa. Quisque vitae tortor suscipit nibh porta aliquam euismod a leo. Aenean at tellus nec velit tempor luctus. Vestibulum tincidunt ligula eu eleifend convallis. Etiam rhoncus pretium lobortis. Nulla aliquam mattis sapien nec congue. Phasellus pretium velit libero, ac volutpat felis imperdiet vel. Vestibulum fringilla posuere nulla, eu dictum velit congue sed. Proin tellus ligula, varius ac odio eget, commodo tempus nisi. Cras iaculis, metus vel vulputate mollis, enim erat lobortis neque, tincidunt ultricies odio erat sit amet felis. Nulla porttitor libero et lacus condimentum porta. Donec vel dignissim ante. Morbi facilisis ornare luctus. Phasellus eget laoreet metus. Mauris et nulla in est facilisis cursus id non arcu. Nulla facilisi. Integer porttitor elit ac turpis dictum, nec rutrum massa commodo. Nullam consequat vehicula ipsum, in dictum ante varius id.';
const txt2 =
  'Pellentesque vehicula rhoncus magna a porta. Morbi massa elit, maximus et elit sit amet, finibus tincidunt tellus. Nunc mollis, velit sit amet varius faucibus, magna sapien congue elit, a convallis turpis massa at odio. Sed nec lobortis dui. Nunc tincidunt mauris ante, et tristique metus suscipit sed. Proin at leo ut arcu finibus placerat at ut augue. Vivamus facilisis nulla purus, tincidunt convallis erat pellentesque vitae. In diam nibh, feugiat at placerat non, pellentesque ut nisi. Aliquam faucibus quam eget porta semper. Morbi egestas lectus nec imperdiet viverra. Integer dapibus lacinia metus, at dapibus sem tincidunt sit amet. Interdum et malesuada fames ac ante ipsum primis in faucibus. In commodo in mi vitae faucibus. Cras placerat in sapien id rhoncus. Vestibulum tincidunt massa pretium tortor elementum tincidunt. Donec massa velit, maximus semper vehicula vitae, convallis in leo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque varius ex ultrices justo faucibus tincidunt. Nunc lacinia leo vitae libero maximus egestas. Proin in ipsum egestas, scelerisque odio sit amet, tempor metus. Ut sit amet leo suscipit, varius lectus dictum, consectetur leo. Cras vel nunc at urna consectetur sodales ultricies quis urna. Duis dapibus purus mi, vel lobortis quam aliquet vitae. Integer et leo nec massa ultricies pulvinar eu eu lorem. Nunc ac accumsan est. Praesent in faucibus risus.';
const txt3 =
  'Fusce pretium, lectus at egestas lacinia, nunc arcu dignissim elit, porta sollicitudin augue sapien elementum lectus. Sed et massa blandit velit pretium scelerisque venenatis non tellus. Suspendisse facilisis pretium est, non fringilla leo mattis in. Integer consectetur, urna ac pharetra volutpat, lectus eros bibendum diam, at ullamcorper risus velit vel magna. Etiam fermentum gravida nisi ac sodales. Nulla facilisi. Integer tempus tellus id lacus pretium, id porttitor tortor rutrum. Ut rhoncus rutrum erat, et luctus urna vulputate non. Donec nec purus consequat, dapibus mi vel, egestas ipsum.';
const txt4 =
  'Maecenas vulputate velit id lorem eleifend dictum. Nunc non orci dolor. Duis a viverra ligula. Morbi felis tortor, ullamcorper eget eleifend et, ultrices non eros. Ut lacus nulla, fringilla ac tortor id, gravida faucibus est. Quisque molestie in tellus scelerisque feugiat. Quisque vitae diam dui. Duis luctus fermentum placerat. Sed ipsum sapien, semper non tristique ac, hendrerit ac quam. Integer vitae eros malesuada sapien sodales finibus sed vel nunc. Ut a massa ante. Vivamus dui tortor, aliquam et purus et, consectetur sollicitudin risus. Praesent egestas lorem sem, eget pellentesque diam interdum ac. Proin aliquet blandit tortor vitae varius. Vivamus viverra tortor ante, at ornare orci iaculis ut. Nam nulla nisi, consequat id ante convallis, imperdiet pretium dui.';
const txt5 =
  'Duis imperdiet vestibulum rutrum. Fusce at auctor ante, id lobortis leo. In ultrices blandit tincidunt. In ornare ullamcorper ultrices. Nunc et nibh dictum, molestie lectus ut, consequat justo. Etiam tincidunt ullamcorper metus, et faucibus purus eleifend quis. Fusce non laoreet ex, at gravida turpis. Aliquam erat volutpat.';

export const getNonesenseText = (index: number): string => {
  switch (index) {
    case 1:
      return txt1;
    case 2:
      return txt2;
    case 3:
      return txt3;
    case 4:
      return txt4;
    case 5:
      return txt5;
    default:
      return '';
  }
};
