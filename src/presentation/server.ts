import express, { Router } from 'express'; 
import path from 'path';

interface Options {
    port:number,
    public_path?:string
    routes: Router;
}

export class Server {

    private app = express();
    private readonly port: number;
    private readonly public_path: string;
    private readonly routes: Router;

    constructor(options: Options) {
        const {port, routes, public_path = 'public'} = options;
        this.port = port;
        this.public_path = public_path;
        this.routes = routes;
    }

    async start() {
        // middlewares
        this.app.use( express.json())
        this.app.use( express.urlencoded({ extended: true }))

        // public folder
        this.app.use(express.static( this.public_path ));

        // Routes
        this.app.use( this.routes );

        this.app.get('*', (req,res) => {
            const indexPath = path.join(__dirname + `../../../${this.public_path}/index.html`);
            res.sendFile(indexPath);
            return;
        })

        this.app.listen(this.port, () => {
            console.log('Server running on port ',this.port);
        })
    }
}