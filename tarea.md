Objetivo: Realizar Minijuegos Web estilo casino para Romper Mitos de Probabilidad y demostrar 
que realmente son mitos y no son ciertos en la vida real. 
Instrucciones: 
Cada equipo debe crear una página web interactiva con 8 minijuegos o simulación visual que 
demuestre por qué un mito es falso o engañoso. Cada juego debe estar en una página diferente por lo 
cual deberá haber un menú que lleve a cada uno de los 8 juegos. La página debe subirse a GitHub page. 
Tecnologías sugeridas: 
• HTML 
• CSS 
• JavaScript 
• Canvas o animaciones CSS 
• Chart.js opcional 
Debe incluir: 
• animación o simulación visual dinamica 
• interacción con el usuario estilo casino 
• explicación del mito que se está evaluando 
• demostración con el juego de como el mito realmente es solo un mito 
*FDC: familia de carreras 
INSTRUMENTO DE EVALUACIÓN 
Revisión: 
Código 
F-SGC-033 
00 
Juego 1 
Juego: “La falacia del jugador” 
Mito 
“Si algo ha pasado muchas veces seguidas, ahora es menos probable que vuelva a pasar.” 
Juego 
Un simulador de lanzamiento de moneda donde aparecen caras y cruces animadas. 
La pantalla muestra algo como, por ejemplo: 
Cara, Cara, Cruz, Cruz, Cara 
El jugador debe elegir que cree que caerá y ver el nivel de probabilidad que tiene su lanzamiento hasta 
caer lo que selecciono ya sea alguna de las dos opciones: 
• Cara 
• Cruz 
El sistema lanza la moneda. 
Después de muchas rondas el juego debe de demostrar que la idea inicial era solo un mito porque: 
“Las probabilidades siempre fueron 50/50”. 
Visual: 
• historial de lanzamientos realizados por el usuario o el sistema 
• contador animado de los lanzamientos y las veces que cayo cara o cruz 
• numero de veces que el usuario logro acertar en su selección 
• debe haber opción de lanzar moneda 1 x 1 o lanzar 20 veces seguidas para 
• el diseño debe ser visual para comprender como funciona el proceso del 50/50 
Conceptos: 
• independencia de eventos 
• probabilidad constante 
Juego 2 
Juego: “¿Puedes ganarle al casino?” 
Mito 
“Si juegas suficiente tiempo, terminarás ganando.” 
Juego 
Una ruleta visual animada. 
El jugador apuesta fichas. Y selecciona si apuesta por color verde, rojo o negro. 
Cada giro muestra animación de ruleta y el resultado obtenido después de parar la ruleta. 
Se iniciará siempre con 100 fichas, el usuario debe poder elegir cuanto apostar de 10 en 10. Es decir, 
apostar 10, 20, 30,40, 50 ,60, 70, 80, 90 o 100 que es el límite de fichas. Aun cuando al usuario ya no le 
quede fichas podrá seguir apostando hasta llegar a un limite de -1000 fichas lo cual significara que le 
debe al casino. 
El usuario puede decidir cuando terminar de jugar y retirarse. 
Si el usuario gana, ganara el doble de lo que aposto es decir si aposto 20 recupera sus 20 y gana los 20 
del casino, si pierde perderá únicamente los 20 apostados. A simple vista parece atractivo pero es 
engañoso y eso es lo que debe demostrar este juego. 
Página 2 de 7                              
Código INSTRUMENTO DE EVALUACIÓN Revisión: 
F-SGC-033 00 
 
Página 3 de 7                              
   
Después de muchas rondas deberá aparece: 
• dinero inicial 
• dinero final 
El juego demuestra que a largo plazo el jugador pierde. 
Conceptos: 
• probabilidad 
• ventaja de la casa 
Visualmente debe ser muy atractivo. 
 
Juego 3 
          Juego: “La carta que nunca sale” 
Mito 
“Si una carta no ha salido en mucho tiempo, ahora es más probable.” 
Juego 
Un simulador de baraja animada de un mazo de 20 cartas. 
El usuario podrá escoger una carta de las 20 posibles y robar cartas. 
Podrá robar de 1 en 1 o 20 en un solo tiro. 
Las siempre deben salir de manera aleatoria, es decir que, aunque el usuario robe 20 pueden repetirse y 
alguna no salir. 
El juego muestra cuántas veces sale cada carta. 
El juego debe incitar o crear una especie de atractivo que haga que el usuario quiera seleccionar la carta 
que aun no ha salido. Por ejemplo, si alguna carta no ha salido decir que esa vale por 2 o por 3 para que 
el usuario quiera cambiar de carta seleccionada. 
El usuario puede decidir con que carta jugar en cada tiro cuando es de 1x1, pero cuando es un tiro de 20 
deberá jugar con la carta que selecciono desde un principio los 20 tiros. 
Visual: 
• cartas animadas 
• contador de frecuencia 
• numero de veces que el usuario acertó 
• veces en las que el usuario perdió por cambiar de carta. 
• Puntuación, cada vez que el usuario logra acertar a una carta que va a salir gana 10 fichas y cada 
vez que no logra acertar pierde 10 fichas. Empieza con 1000 fichas. 
Después de muchos intentos muestra que no existe memoria en eventos independientes. 
 
Juego 4 
                 Juego: “Contagio en el salón” 
Mito 
“Un contagio ocurre al azar y no depende del contacto.” 
Juego 
Un mapa visual con personitas animadas en las cuales una persona esta contagiada. 
Una persona infectada. 
Cada ronda se mueve y pueden contagiarse entre sí. 
Código INSTRUMENTO DE EVALUACIÓN Revisión: 
F-SGC-033 00 
 
Página 4 de 7                              
   
El usuario debe seleccionar quien cree que será contagiado tras cada ronda, los contagios ocurren por 
contacto, pero de manera aleatoria. 
Por ejemplo, si tenemos la siguiente tabla de contagio podría ocurrir así, para la primera ronda solo 
tenemos un contagiado, el usuario debera escoger cual de los posibles cree que se contagiara 
     
 posible posible posible  
 posible Contagiado posible  
 posible posible posible  
     
 
Tras la segunda ronda suponiendo que queda de esta forma, si el usuario escogió uno posible que 
realmente se contagio entonces gana 10 fichas si no, pierde 10 fichas. 
     
 contagiado posible contagiado  
 contagiado contagiado posible  
 posible posible contagiado  
     
 
El usuario puede cambiar: 
• probabilidad de contagio este es que tan rápido se contagian, es decir que tan rápido es el 
contagio para los posibles 
• número de contactos cuantas personas cree que se pueden contagiar 1, 2 ,3, etc. ya que cada 
ronda se puede contagiar 1 o varias personas de manera aleatoria y dependiendo de que tan alta o 
baja sea la probabilidad de contagio 
Visualmente se ve cómo crece el contagio. 
Conceptos: 
• eventos dependientes 
• probabilidad condicional 
 
Juego 5 
       Juego: “¿La suerte mejora con más intentos?” 
Mito 
“Si intento muchas veces, seguro lo logro.” 
Juego 
Un sistema tipo premio raro. 
El jugador intenta conseguir un premio de una tómbola el cual tiene: 
5% de probabilidad de ganarse tras cada tiro. 
Visual: 
• barra de progreso de cuantas veces se ha intentado obtener 
• contador de intentos hasta obtener el premio o agotar las fichas 
• animación de recompense al obtener el premio 
• el usuario cuenta con 1000 fichas para obtener el premio y cada intento cuesta 10 fichas. 
INSTRUMENTO DE EVALUACIÓN 
Revisión: 
Código 
F-SGC-033 
00 
Después de muchos intentos el juego muestra que no está garantizado llevarse el premio. 
Conceptos: 
• probabilidad repetida 
• frecuencia esperada 
Juego 6 
Juego: “Loot box simulator” 
Mito 
“Si compras muchas cajas, seguro obtendrás el objeto legendario.” 
Juego 
Un sistema de Cajas animadas que se abren tipo premio raro. Parecido a los juegos con Gacha de 
cartas. 
El jugador intenta conseguir un objeto con LEGENDARIO el cual tiene: 
5% de probabilidad de aparecer tras cada tiro. 
El usuario debe comprar mazos de cartas de 10 cartas cada mazo, puede decidir si comprar 1 mazo o 10 
mazos, cada mazo cuesta 10 fichas y si compra 10 mazos le cuesta 90 fichas. 
Visual: 
• barra de progreso del numero de cartas que debe tener los mazos es decir cuantos ya salieron del 
mazo o mazos comprados 
• contador de intentos, es decir cuantos mazos ha comprado el usuario y cuantas cartas ya le 
salieron. 
• animación de recompensa al conseguir la carta legendaria. 
• Las posibles cartas que pueden salir son común, raro, épico y legendario. 
• Común 80% de probabilidad  
• Raro 50% de probabilidad 
• Épico 20% de probabilidad 
• Legendario 5% de probabilidad 
• El usuario dispone de 1000 fichas para conseguir la carta legendaria. 
Después de muchos intentos el juego muestra que no está garantizado obtener una carta legendaria. 
Conceptos: 
• probabilidad repetida 
• frecuencia esperada 
Demuestra lo difícil que es obtener el legendario. 
Conceptos: 
• probabilidad acumulada 
• eventos independientes 
Página 5 de 7                              
INSTRUMENTO DE EVALUACIÓN 
Revisión: 
Código 
F-SGC-033 
00 
Juego 7 
Juego: “¿Qué número saldrá?” 
Mito 
“Los números tienen patrones.” 
Juego 
Una ruleta de números del 1 al 10. 
El jugador intenta predecir el siguiente número tras cada tiro. 
El juego muestra que los patrones percibidos no existen. 
Visual: 
• gráfico de resultados tras cada tiro 
• historial de números que han caido  
• historial de veces que el usuario acerto el numero 
• historial de las veces que no acerto 
• cada tiro cuesta 10 fichas y el usuario cuenta con 1000 fichas 
• cada acierto devuelve 10 fichas y cada error quita 10 fichas 
Conceptos: 
• aleatoriedad 
• frecuencia relativa 
Juego 8 
Juego: “La ilusión de la precisión” 
Mito 
“Si algo casi ocurre, significa que estamos cerca de lograrlo.” 
Juego visual e interactivo de tragamonedas. 
Juego 
Tres rodillos animados con diferentes opciones que pueden salir. 
Muchas veces salen combinaciones casi ganadoras. Por ejemplo 7 7  
Casi cae 3 veces el 7 pero salió una estrella. 
El usuario tiene 1000 fichas para lanzar, cada tiro cuesta 10 fichas, cada combinación ganadora debe 
recompensar con fichas pero cada una con diferente monto, queda a decisión del equipo la recompensa a 
cada combinación, pero para que una combinación sea ganadora los 3 rodillos deben ser iguales por 
ejemplo que caiga 777. 
El sistema explica que eso no cambia la probabilidad real. 
Conceptos: 
• independencia 
• percepción vs probabilidad 
Página 6 de 7                              
Código INSTRUMENTO DE EVALUACIÓN Revisión: 
F-SGC-033 00 
 
Página 7 de 7                              
   
Reglas del proyecto 
   Minijuego funcional 
Debe poder jugarse con un estilo de casino donde el usuario pueda interactuar y realizar cada juego para 
comprender como funciona el mito y como se demuestra que es realmente falso. 
   Mito explicado 
Texto breve del mito que se está rompiendo en el juego, los cuales se están mencionando en cada juego. 
   Demostración visual 
Animación o simulación del juego lo mas llamativo y detallado posible sin salirse de lo profesional, 
debe ser atractivo para el usuario sin excederse y llegar a sobrecargar la pagina. 
   Conclusión 
Qué enseña la probabilidad y como se rompe el mito con una frase o apartado donde le expliquen al 
jugador que sucedió y como el mito se rompio 
 
Rúbrica de calificación 
Criterio Puntos 
Funcionalidad del juego 25 
Aplicación de probabilidad 25 
Interactividad 25 
Diseño visual 20 
Explicación del mito 5 
 
Recordatorio final para los equipos 
Debe mencionar cada juego el mito que se está rompiendo. 
Breve explicación de cómo se rompió y demostró que el mito efectivamente solo es un mito. 
Se debe poder interactuar con todos los juegos. 
Debe ser llamativo visualmente sin exceder. 
Una buena pagina no es la que tiene mas contenido si no la que sabe que contenido mostrar. 