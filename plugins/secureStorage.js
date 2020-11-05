import 'capacitor-secure-storage-plugin';
import { Plugins } from '@capacitor/core';

const { SecureStoragePlugin } = Plugins;

export default function ( { app }, inject ) {
  inject( 'CapacitorSecureStorage', SecureStoragePlugin );
}