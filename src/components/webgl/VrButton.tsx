import { useThree } from 'react-three-fiber';
import { VRButton } from 'three/examples/jsm/webxr/VRButton';
import { useEffectOnce } from '../../utils/hooks';


/**
 * Adds Three.js' "ENTER VR" button, if WebXR is supported by the user's browser.
 */
function VrButton() {
  const { gl } = useThree();

  useEffectOnce(() => {
    if ('xr' in navigator) {
      const vrButton = VRButton.createButton(gl);

      document.body.appendChild(vrButton)
      return () => {
        document.body.removeChild(vrButton);
      };
    }
  });
  return null;
}


export default VrButton;
