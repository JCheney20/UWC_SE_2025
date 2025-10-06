{
  description = "Development environment for UniRide";
  inputs.utils.url = "github:numtide/flake-utils";
  outputs = { self, nixpkgs, utils }: utils.lib.eachDefaultSystem (system:
    let pkgs = nixpkgs.legacyPackages.${system}; in
    {
      devShell = pkgs.mkShell {
        buildInputs = with pkgs; [ nodejs pnpm mprocs ];
        shellHook = ''
          echo "First time running this? Run \"pnpm install\"."
          echo "Run \"mprocs 'pnpm start' 'pnpx firebase-tools emulators:start'\" to start the Expo application and firebase emulators."
        '';
      };
    }
  );
}
