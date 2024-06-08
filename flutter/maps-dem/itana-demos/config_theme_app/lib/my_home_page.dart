import 'package:flutter/material.dart';

class MyHomePage extends StatelessWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  Widget build(BuildContext context) {
    final TextTheme textTheme = Theme.of(context).textTheme;
    return GestureDetector(
      onTap: () => FocusScope.of(context).unfocus(),
      child: Scaffold(
        appBar: AppBar(title: Text(title)),
        body: Center(
          child: SingleChildScrollView(
            child: Padding(
              padding: const EdgeInsets.all(8.0),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  const Icon(Icons.check_circle),
                  const SizedBox(height: 20.0),
                  Text('Title Large', style: textTheme.titleLarge),
                  Text('Title Medium', style: textTheme.titleMedium),
                  Text('Title Small', style: textTheme.titleSmall),
                  const SizedBox(height: 30.0),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      ElevatedButton(
                        onPressed: () {},
                        child: const Text('ElevatedButton'),
                      ),
                      OutlinedButton(
                        onPressed: () {},
                        child: const Text('OutlineButton'),
                      ),
                      TextButton(
                        onPressed: () {},
                        child: const Text('TextButton'),
                      ),
                    ],
                  ),
                  const SizedBox(height: 30.0),
                  const TextField(),
                  const SizedBox(height: 10.0),
                  const TextField(),
                ],
              ),
            ),
          ),
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: () {},
          child: const Icon(Icons.add),
        ),
      ),
    );
  }
}
